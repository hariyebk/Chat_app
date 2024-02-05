import { User, Message, Conversation } from "@prisma/client";

export type MessageType  = Message 

export type ConversationType = Conversation & {
    messages: MessageType[]
    users: User[],
}



