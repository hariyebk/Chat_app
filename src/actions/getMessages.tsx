"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "./getCurrentUser"

export async function getMessages(id: string){
    const currentUser = await getCurrentUser()
    // If the user hasn't logged in 
    if(!currentUser?.email){
        return null
    }
    try{
        // All the messages of this chat
        const conversation = await db.conversation.findUnique({
            where: {
                id: id
            },
            include: {
                // populate all the users
                messages: true,
            }
        })   
        
        return conversation
    }
    catch(error: any){
        console.log(error.message)
        return null
    }

}