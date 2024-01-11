"use client"
import { routes } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileFooter() {
    const pathname = usePathname()
    return (
        <div className="relative">
            <ul className="lg:hidden fixed bottom-0 bg-white border-t w-full py-6 px-20 z-40 flex items-center justify-between ">
                    {
                        routes.map((item) => {
                            return (
                                <li key={item.label}>
                                    <Link href={item.href} className={`${pathname.includes(item.href) ? "text-black" : "text-gray-500"} flex items-center justify-between`}>
                                        <item.icon style = {{fontSize: "25px"}} />
                                        <span className="sr-only"> {item.label} </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
            </ul>
        </div>
    )
}
