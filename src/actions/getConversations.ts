"use server"
import { db } from "@/lib/db"
import { getCurrentUser } from "./getCurrentUser"

export async function getConversations(){
    const currentUser = await getCurrentUser()
    if(!currentUser?.id){
        return []
    }
    try{
    // fetch the conversations the user is involved with.
    const conversations = await db.conversation.findMany({
        orderBy: {
            lastMessageAt: "desc"
        },
        where: {
            // All the chats that this user is involved with.
            userIds: {
                has: currentUser.id
            }
        },
        include: {
            // populate all the users and messages  in this conversation
            users: true,
            messages: {
                include: {
                    // populate the array with the user's data who have seen the message.
                    seen: true,
                    sender: true
                }
            }
        }
    })

    return conversations

    }
    catch(error: any){
        console.log(error.messge)
        return []
    }
}