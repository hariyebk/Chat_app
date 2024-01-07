"use client"
import { routes } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "@prisma/client"
import Image from "next/image"
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
            <nav className="mt-4 pb-16 flex flex-col justify-between items-center">
                <div onClick={() => {}} className="cursor-pointer hover:opacity-75 transition">
                    <div className="relative inline-block rounded-full overflow-hidden p-6 md:h-11 md:w-11">
                        <Image src={user?.image || "/images/placeholder.jpg"} alt="user-avatar" width={48} height={48} />
                        {/* Green active ststaus */}
                        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-1 h-2 w-2 md:h-3 md:w-3" />
                    </div>
                </div>
            </nav>
        </section>
    )
}
