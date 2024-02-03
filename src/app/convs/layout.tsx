
import { getConversations } from "@/actions/getConversations";
import UsersPageLayout from "../users/layout";
import ConversationList from "./components/ConversationList";

export default async function layout({children}: {children: React.ReactNode}) {
    // Fetch all the users conversations
    const conversations = await getConversations()
    return (
        <UsersPageLayout>
            {/* Conversations list will be hidden If the URL has an id parameter which signifies for a specific chat not the whole chat History of the user */}
            <ConversationList conversations={conversations} />
            <div className="h-full">
                {children}
            </div>
        </UsersPageLayout>
    )
}
