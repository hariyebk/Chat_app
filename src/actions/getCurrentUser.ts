"use server"
import { db } from "@/lib/db"
import { getSession } from "./getCurrentSession"

export async function getCurrentUser(){
    const session = await getSession()
    if(!session?.user?.email){
        // if there is no current session return null
        return null
    }
    // Find the current users data
    const user = await db.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    if(!user){
        return null
    }

    return user
}