import { MessageType } from "@/types"
import { Message, User } from "@prisma/client"
import { useSession } from "next-auth/react"

export default function hasSeen(lastMessage: MessageType | undefined): boolean{
    const session = useSession()
    // array of users who have seen the message
    const seenArray = lastMessage?.seen
    // If there is no conversation held, there will not be a last message
    if(!lastMessage){
        return false
    }
    // If the user hasn't signed in
    if(session.data?.user?.email){
        return false
    }
    // check if the current users id is in the seen array of the lastMessage
    return seenArray?.filter((user: User) => user.email === session.data?.user?.email).length !== 0
}