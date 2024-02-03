"use client"

import { ConversationType } from "@/types"
import { useParams, useRouter } from "next/navigation"
import { HiUsers } from "react-icons/hi";
import ConversationItem from "./ConversationItem";
interface ConversatoionsListProps {
    conversations: ConversationType[],
}
export default function ConversationList({conversations}: ConversatoionsListProps){
    const router = useRouter()
    const params = useParams()
    return (
        <aside className={`${params.id ? "hidden" : "block w-full left-0"} fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 overflow-y-auto border-r border-gray-200`}>
            <div className="px-4">
                <div className="mt-5 flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-800"> Messages </h2>
                    <HiUsers />
                </div>
                {conversations.map((conversation) => {
                    return (
                        <ConversationItem key={conversation.id} conversation={conversation} />
                    )
                })}
            </div>
        </aside>
    )
}
