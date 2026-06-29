import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";

import { getDataFromToken } from "@/helper/getDataFromToken";

export async function post(req : NextRequest){
    try {
        await connect();
        const userId = await getDataFromToken(req) ;
        const user = await User.findOne({_id : userId}).select("-password -verificationToken -verificationTokenExpiry -forgotPasswordToken -forgotPasswordExpiry") ;
        if(!user){
            return NextResponse.json({ message : "User not found" }, { status : 404 });
        }
        return NextResponse.json({ message : "User found" , success : true , user }) ;
    } catch (error: any) {
        return NextResponse.json({ message : error.message }, { status : 500 });
    }
    }
