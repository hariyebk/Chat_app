import { Conversation } from "@prisma/client"

interface ConversatoionsListProps {
    conversations: Conversation[]
}
export default function ConversationList({conversations}: ConversatoionsListProps) {
    return (
        <section className="h-full mt-6">
            conversations
        </section>
    )
}
