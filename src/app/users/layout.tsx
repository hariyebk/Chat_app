import { getUsers } from "@/actions/getUsers"
import MobileFooter from "@/components/MobileFooter"
import UsersList from "@/components/UsersList"
import Sidebar from "@/components/sidebar/Sidebar"

interface LayoutProps {
    children: React.ReactNode
}
export default async function layout({children}: LayoutProps) {
    const users = await getUsers()
    return (
        <main className="h-full lg:pl-20">
            <Sidebar />
            <UsersList users={users} />
            {children}
            <MobileFooter />
        </main>
    )
}
