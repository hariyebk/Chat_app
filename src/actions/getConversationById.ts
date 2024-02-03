"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "./getCurrentUser"

export async function getConversationById(id: string){
    const currentUser = await getCurrentUser()
    // If the user hasn't logged in 
    if(!currentUser?.email){
        return null
    }
    try{
        const conversation = await db.conversation.findUnique({
            where: {
                id: id
            },
            include: {
                // populate all the users and messages  in this conversation
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true
                    }
                }
            }
        })   
        
        return conversation
    }
    catch(error: any){
        console.log(error.message)
        return null
    }

}