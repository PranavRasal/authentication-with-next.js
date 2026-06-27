import { connect } from "@/dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

export async function POST(req: NextRequest) {
    try {
        await connect();

        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const saveUser = await newUser.save();
        const emailResult = await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

        const wasEmailSkipped = typeof emailResult === "object" && emailResult !== null && "skipped" in emailResult && Boolean((emailResult as { skipped?: boolean }).skipped);

        return NextResponse.json(
            {
                message: wasEmailSkipped
                    ? "User created successfully. Verification email could not be sent because email settings are not configured."
                    : "User created successfully",
                user: saveUser,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup failed", error);
        return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
    }
}