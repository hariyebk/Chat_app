import { MessageType } from "@/types";

export default function lastMessageText(lastMessage: MessageType | undefined){
     // If the last message of the conversation is an image
    if(lastMessage?.image){
        return "Sent an image"
    }
    // If the last message of the conversation is a text
    if(lastMessage?.body){
        return lastMessage.body
    }
    // If there is no last message at all
    return "start a conversation"
}