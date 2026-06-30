import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModels";

const emailConfig = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    user: "07252e5abe9b02",
    pass: "081850435e4b03",
    from: "team@example.com",
};

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const rawToken = randomBytes(32).toString("hex");
        const hashedToken = await bcryptjs.hash(rawToken, 10);
        const domain = process.env.DOMAIN || "http://localhost:3000";

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,{
                $set: {   
                    verificationToken: hashedToken,
                    verificationTokenExpiry: new Date(Date.now() + 3600000),
                }
            },
                { new: true }
            );
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,{
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordExpiry: new Date(Date.now() + 3600000),
                }
            },
                { new: true }
            );
        }

        const { host, port, user, pass, from } = emailConfig;

        if (!host || !user || !pass) {
            console.warn("Email credentials are not configured. Skipping verification email.");
            return { skipped: true };
        }

        const transport = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: {
                user,
                pass,
            },
        });

        const mailOptions = {
            from: `"Example Team" <${from}>`,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: "Hello world?",
            html: `<p>Click <a href="${domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy the link: ${domain}/verifyemail?token=${hashedToken}</p>`,
        };

        return await transport.sendMail(mailOptions);

    } catch (error: any) {
        console.error("Email sending failed", error);
        return { skipped: true, error: error.message };
    }
};
