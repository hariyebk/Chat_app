"use client"
import { User, Conversation, Message } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import {format} from "date-fns"
import { useSession } from "next-auth/react"
import { ConversationType } from "@/types"
import getTheOtherUserOFChat from "@/hooks/otherUser"
import hasSeen from "@/hooks/hasSeen"
import lastMessageText from "@/utils/lastMessageType"
import Avatar from "@/app/users/components/Avatar"

interface ConversationItemProps {
    conversation: ConversationType
    selected?: boolean
}
export default function ConversationItem({conversation, selected}: ConversationItemProps){
    const router = useRouter()
    const otherUser = getTheOtherUserOFChat(conversation)
    const session = useSession()
    function handleClick(){
        // redirect the user to the clicked chat
        router.push(`/convs/${conversation.id}`)
    }
    // Find the Last message of the chat
    const lastMessage = conversation.messages.at(conversation.messages.length - 1)
    // Check if the user has seen the last message
    const UserHasSeen = hasSeen(lastMessage)
    // content of the last message. the last message of the conversation might be an image or a text . if it is an image "sent an image" will be retured 
    const lastMessageContent = lastMessageText(lastMessage)
    
    return (
        <div className={`mt-10 px-4 pt-9 w-full h-[74px] relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer ${selected ? "bg-neutral-100" : "bg-white"}`} onClick={handleClick}>
            <div className="flex items-center gap-3 -mt-6">
                <div className="-mt-8">
                    <Avatar user={otherUser!} />    
                </div>
                <div className="w-full flex flex-col items-start">
                    <div className="flex flex-1 items-center justify-between focus:outline-none mb-14">
                        {/* Name of the user or group name */}
                        <p className="text-md text-black font-semibold"> {conversation.name || otherUser?.name} </p>
                        {/* display the time where the last message was sent */}
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-sans font-light">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    {/* display the last message and style depending on if the user has sawn it or not */}
                    <p className={`${UserHasSeen ? "text-gray-500" : "text-black font-medium"} text-xs -mt-12`}> {lastMessageContent} </p>
                </div>
            </div>
        </div>
    )
}
