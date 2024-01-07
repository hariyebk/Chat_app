"use server"
import { db } from "@/lib/db"
import { getSession } from "./getCurrentSession"

export async function getUsers(){
    const session = await getSession()
    if(!session?.user?.email){
        return []
    }
    try{
    // get all users except me
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            NOT: {
                email: session.user.email
            }
        }
    })
    return users
    }
    catch(error: any){
        console.log(error.message)
        return []
    }
    
}