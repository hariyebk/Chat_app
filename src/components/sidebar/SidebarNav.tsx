"use client"

import { routes } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "@prisma/client"
import Avatar from "../../app/users/components/Avatar"
interface SidebarProps {
    user: User | null
}
export default function SidebarNav({user}: SidebarProps) {
    const pathname = usePathname()
    return (
        <section className="h-full flex flex-col items-center justify-between">
            <nav className="mt-4 flex flex-col justify-between">
                <ul className="flex flex-col items-center gap-3">
                    {
                        routes.map((item) => {
                            return (
                                <li key={item.label}>
                                    <Link href={item.href} className={`${pathname.includes(item.href) ? "text-black" : "text-gray-500"} flex items-center gap-2 p-3 text-sm`}>
                                        <item.icon style = {{fontSize: "30px"}} />
                                        <span className="sr-only"> {item.label} </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <Avatar user={user} />
        </section>
    )
}
