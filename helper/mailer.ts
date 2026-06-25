import nodemailer from "nodemailer";

export const sendEmail = async({email , emailType , userId}) => {
    try {
        
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false , // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

    const mailOptions = {
    from: '"Example Team" <team@example.com>', // sender address
    to: email, // list of recipients
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // HTML body
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}