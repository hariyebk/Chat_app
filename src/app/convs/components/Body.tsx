import { ConversationType } from "@/types"
import { Message } from "@prisma/client"

interface BodyProps {
    messages: Message[]
}
export default function Body({messages}: BodyProps) {
    return (
        <section className="flex-1 overflow-y-auto">
            <div>

            </div>
        </section>
    )
}
