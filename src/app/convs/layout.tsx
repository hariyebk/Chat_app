
import { getConversations } from "@/actions/getConversations";
import UsersPageLayout from "../users/layout";
import ConversationList from "./components/ConversationList";

export default async function layout({children}: {children: React.ReactNode}) {
    const conversations = await getConversations()
    return (
        <UsersPageLayout>
            <ConversationList conversations={conversations} />
            <div className="h-full">
                {children}
            </div>
        </UsersPageLayout>
    )
}
