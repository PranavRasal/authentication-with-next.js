import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req : NextRequest){
    try {
        await connect();
        const reqBody = await req.json();

        const { email , password } = reqBody ;
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({ message : "User not found" }, { status : 404 });
        }

        const isMatch = await bcryptjs.compare(password , user.password) ;
        if(!isMatch){
            return NextResponse.json({message : "Invalid password "} , { status : 400}) ;
        }

        const tokenDate = {
            id : user._id ,
            email : user.email ,
            username : user.username
        }
        const token =  jwt.sign(tokenDate , process.env.TOKEN_SECRET! , { expiresIn : "1d" }) ;
        const respone = NextResponse.json({ message : "Login successful"  , success : true , token }) ;
        respone.cookies.set("token" , token , { httpOnly : true }) ;

        return respone ;

        } catch (error : any) {
        return NextResponse.json({   message:  error.message || "Something went wrong" }, { status: 500 });
    }
}