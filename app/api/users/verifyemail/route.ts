import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ message: "Verification token is missing" }, { status: 400 });
        }

        const users = await User.find({
            verificationToken: { $exists: true },
            verificationTokenExpiry: { $gt: Date.now() },
        }).lean();

        let matchedUser = null;

        for (const candidate of users) {
            if (candidate.verificationToken && (await bcryptjs.compare(token, candidate.verificationToken))) {
                matchedUser = candidate;
                break;
            }
        }

        if (!matchedUser) {
            return NextResponse.json({ message: "Invalid or expired verification token" }, { status: 400 });
        }

        await User.findByIdAndUpdate(matchedUser._id, {
            isVerified: true,
            verificationToken: null,
            verificationTokenExpiry: null,
        });

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Verification failed", error);
        return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
    }
}
