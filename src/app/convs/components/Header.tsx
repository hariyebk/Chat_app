"use client"

import Avatar from "@/app/users/components/Avatar";
import getTheOtherUserOFChat from "@/hooks/otherUser"
import { ConversationType } from "@/types"
import Link from "next/link"
import { IoChevronBack } from "react-icons/io5";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface HeaderProps {
    conversation: ConversationType
}

export default function Header({conversation}: HeaderProps) {
    const otherUser = getTheOtherUserOFChat(conversation)
    let statusText:string
    if(conversation.isGroup){
        statusText = `${conversation.users.length} members`
    }
    else {
        statusText = "Active"
    }
    return (
        <header className="bg-white w-full flex border-b-[1px] sm:px-4 py-5 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="w-full flex gap-5 items-center justify-between px-6">
                <Link href={'/convs'} className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
                    <IoChevronBack size = {32} />
                </Link>
                <div className="w-full flex items-center gap-3">
                    <Avatar user={otherUser!} />
                    <div className="mt-5 flex flex-col gap-1.5">
                        <p className="font-semibold">
                            {/* If it is a group chat , the group name will be displayed else the other users name will be displayed */}
                            {conversation.name || otherUser?.name}
                        </p>
                        <p className="text-xs font-light text-neutral-500">
                            {statusText}
                        </p>
                    </div>
                </div>
                <button className="text-sky-500 cursor-pointer hover:text-sky-600 transition">
                    <BiDotsHorizontalRounded size = {20} />
                </button>
            </div>
        </header>
    )
}
