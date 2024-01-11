import { User } from "@prisma/client"
import UserItem from "./UserItem"

interface UsersListProps {
    users: User[] | null[]
}

export default function UsersList({users}: UsersListProps) {
    return (
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 left-0 lg:w-80 w-full block overflow-y-auto border-r  border-gray-200 ">
            <div className="w-full px-5">
                <div className="flex-col">
                    <p className="text-2xl font-bold text-neutral-800 py-6">
                        People
                    </p>
                </div>
                {users.map((user) => {
                    return (
                        <UserItem key={user?.id} user={user!} />
                    )
                })}
            </div>
        </aside>
    )
}
