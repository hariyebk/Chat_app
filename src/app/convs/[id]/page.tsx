import { getConversationById } from "@/actions/getConversationById"
import EmptyState from "@/components/EmptyState"
import Header from "../components/Header"
import Body from "../components/Body"
import MessageForm from "../components/MessageForm"

export default async function page({params}: {params: {id: string}}) {
    const conversation = await getConversationById(params.id)
    // If there is no conversation 
    if(!conversation){
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }
    return (
        <section className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body messages={conversation.messages} />
                <MessageForm />
            </div>
        </section>
    )
}
