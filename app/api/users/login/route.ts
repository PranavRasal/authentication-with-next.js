import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function post(req : NextRequest){
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



    } catch (error : any) {
        return NextResponse.json({   message:  error.message || "Something went wrong" }, { status: 500 });
    }
}