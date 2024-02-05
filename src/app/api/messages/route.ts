import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { id } from "date-fns/locale";
import { NextResponse} from "next/server";

export async function POST(request: Request){
    const currentUser = await getCurrentUser()
    // check if the current user is logged in
    if(!currentUser?.email){
        return new NextResponse("UnAuthorized", {status: 401})
    }
    // parse the request object
    const {conversationId, message, image} = await request.json()
        try{
            // create the new message in the database
            const newMessage = await db.message.create({
                data: {
                    body: message,
                    image: image,
                    // Link the message with the conversation.
                    conversation: {
                        connect: {
                            id: conversationId
                        }
                    },
                    // set the current user as the sender of the message.
                    sender: {
                        connect: {
                            id: currentUser.id
                        }
                    },
                    // Add the current user to the list of  users who have seen the new message
                    seen: {
                        connect: [
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                // Populating the connected data's
                include: {
                    seen: true,
                    sender: true,
                }
            })
            // Update the conversation with the new message added to the chat.
            const updatedConversation = await db.conversation.update({
                where: {
                    id: conversationId
                },
                data: {
                    // update the date for the last message.
                    lastMessageAt: new Date(),
                    // Add the new message to the messages array.
                    messages: {
                        connect: [
                            {
                                id: newMessage.id
                            }
                        ]
                    }
                },
                // populate the users and messages in the conversation
                include: {
                    users: true,
                    messages: {
                        include: {
                            seen: true,
                            sender: true
                        }
                    }


                }
            })

            // return the new message
            return NextResponse.json(newMessage)

        }
        catch(error: any){
            console.log(error.message)
            return new NextResponse("Internal server error", {status: 500})
        }
}