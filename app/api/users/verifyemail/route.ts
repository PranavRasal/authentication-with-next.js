import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";


export async function POST(req: NextRequest) {
    try {
        await connect();
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log("Token received:", token);

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 400 });
        }

        user.isVerified = true ;
        user.verificationToken = undefined ;
        user.verificationTokenExpiry = undefined ;

        await user.save();  

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Verification failed", error);
        return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
    }
}
