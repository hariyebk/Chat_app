import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user: User | null
}
export default function Avatar({user}: AvatarProps) {
    return (
        <nav className="mt-4 pb-16 flex flex-col justify-between items-center">
            <div onClick={() => {}} className="cursor-pointer hover:opacity-75 transition">
                <div className="relative inline-block">
                    <Image src={user?.image ? user.image : '/images/placeholder.jpg'} alt="user-avatar" width={36} height={36} className="rounded-full overflow-hidden" />
                    {/* Green active ststaus */}
                    <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
                </div>
            </div>
        </nav>
    )
}
