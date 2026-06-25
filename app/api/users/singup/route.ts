import { connect } from "@/dbconfig/dbconfig"; 
import { NextResponse , NextRequest } from "next/server";
import  User from "@/models/userModels"
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helper/mailer";

connect();


export async function POST(req: NextRequest) {

    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;
        console.log(reqBody)

        const user = await User.findOne({email}) ;
        if(user) {
            return NextResponse.json({message: "User already exists"},{status: 400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt) ;

        const newUser = new User({
            username ,
            email ,
            password : hashedPassword
        })
        const saveUser = await newUser.save();
        console.log(saveUser) ;
        
        // send email to user for verification
        await sendEmail({email , emailType : "VERIFY" , userId : saveUser._id}) ;
        
        return NextResponse.json({message: "User created successfully" ,user : saveUser}, {status: 201})  


        

    } catch (error : any) {
        return NextResponse.json({message: error.message}, {status: 500})
        
    }

}