import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { createUserSchema } from "@/lib/validation"
import { NextResponse} from "next/server"


export async function POST(request: Request){
    try{
    const body = await  request.json()
    const {email, name, password} = body
    // check if the user provided all the credentials
    if(!email || !name || !password){
        return new NextResponse("Missing info", {
            status: 400,
        })
    }
    // form validation
    const results = createUserSchema.safeParse({
        name,
        email,
        password
    })
    if(!results.success){
        return new NextResponse(results.error.message, {
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