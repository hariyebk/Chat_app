import { User, Message } from "@prisma/client";

export type MessageType  = {
    seen: User[],
    sender: User,
}

export type ConversationType = {
    users: User[],
    messages: MessageType[]
}

