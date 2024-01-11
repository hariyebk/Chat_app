import { db } from "@/lib/db"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"


export async function POST(request: Request){
    try{
        // get the current use
        const currentUser = await getCurrentUser()
        // there are two kinds of chats - private chats and group chats
        const {userId, isGroup, members, name} = await request.json()
        // if there is no signed in user
        if(!currentUser?.id || !currentUser.email){
            return new NextResponse("umauthorized", {
                status: 401
            })
        }
        // if there are no memebers of a group
        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse("Invalid data", {
                status: 400
            })
        }
        // for group chats
        if(isGroup){
            const newGroupChat = await db.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            // return the id of all the members of the group chat.
                            ...members.map((members: {value: string}) => {
                                id: members.value
                            }),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                // populating the users array
                include: {
                    users: true
                }
            })
            // sending the new chat created to the user
            return NextResponse.json(newGroupChat)
        }
        // for private chats, first, find if the user has already talked with the selected user
        const existingChats = await db.conversation.findMany({
            // query by two options. depending on who first created the chat
            where: {
                OR: [
                    {
                        // userIds field is an array that contains the id's of the initiator and the user being talked to.
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]

            }
        })
        if(existingChats.length > 0){
            // return the existing chat
            return NextResponse.json(existingChats.at(0))
        }
        // else create a new private chat
        const newPrivateChat = await db.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: userId
                        },
                        {
                            id: currentUser.id
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })
        // send the newly created private chat
        return NextResponse.json(newPrivateChat)
    }
    catch(error: any){
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
    
}