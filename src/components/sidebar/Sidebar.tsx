import { getCurrentUser } from "@/actions/getCurrentUser";
import SidebarNav from "./SidebarNav";

export default async function Sidebar() {
    const user = await getCurrentUser()
    return (
        <div className="max-lg:hidden fixed inset-y-0 left-0 w-20 xl:px-6 overflow-y-auto bg-white border-r pb-4 flex flex-col justify-between">
            <SidebarNav user={user} />
        </div>
    )
}
