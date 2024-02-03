import { User, Message, Conversation } from "@prisma/client";

export type MessageType  = Message & {
    seen: User[],
    sender: User,
}

export type ConversationType = Conversation & {
    messages: MessageType[]
    users: User[],
}

