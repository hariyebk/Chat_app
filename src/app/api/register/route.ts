import bcrypt from "bcrypt"
import { db } from "@/libs/prismadb"
import { NextResponse} from "next/server"
import validator from 'validator'


export async function POST(request: Request){
    try{
    const body = await  request.json()
    const {email, name, password} = body
    // check if the user provided all the credentials
    if(!email || !name || !password){
        new NextResponse("Missing info", {
            status: 400,
        })
    }
    // validate credentials
    const errors: string[] = []
    const validateCredentials = [
        {
            valid: validator.isLength(name, {
                min: 1,
                max: 10
            }),
            errorMessage: "Invalid name"
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Invalid Email"
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "password is not strong enough"
        }
    ]
    // check if inputs are valid
    validateCredentials.forEach((check) => {
        if(!check.valid){
            errors.push(check.errorMessage)
        }
    })
    if(errors.length > 0){
        new NextResponse(errors[0], {
            status: 400
        })
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    // create the user
    const user = await db.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    })

    return NextResponse.json(user,{
                status: 201
            }
        )
    }
    catch(error: any){
        console.log(error.message)
        return new NextResponse("Internal Server Error", {
            status: 500 
        })
    }
}