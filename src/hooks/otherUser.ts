import { getCurrentUser } from "@/actions/getCurrentUser";
import { ConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function getTheOtherUserOFChat(converstaion: ConversationType | { users: User[]}){
    const session = useSession()
    const otherUser = converstaion.users.find((user) => user.email !== session.data?.user?.email)
    return otherUser
}

