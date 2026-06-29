import { connect } from "@/dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        
        await connect();
        const response = NextResponse.json({ message: "Logout successful" ,
            success : true});
        response.cookies.set("token" , "" , { httpOnly : true ,
            expires : new Date(0) }) ;
        




    } catch (error : any) {
         return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
    }
}