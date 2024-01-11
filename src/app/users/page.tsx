import { getUsers } from "@/actions/getUsers";
import EmptyState from "@/components/EmptyState";
import UsersList from "./components/UsersList";

export default async function page() {
    const users = await getUsers()
    return (
        <section className="h-full">
            <UsersList users={users} />
            <div className="hidden lg:block lg:pl-80 w-full h-full">
                <EmptyState />
            </div>
        </section>
    )
}
