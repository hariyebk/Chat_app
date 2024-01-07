import { signOut } from "next-auth/react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

export enum sessionStatus {
    authenticated = "authenticated",
    unauthenticated = "unauthenticated",
    loading = "loading"
}

export const routes = [
    {
        label: "Chat",
        href: "/convs",
        icon: IoChatbubblesOutline
    },
    {
        label: "Users",
        href: "/users",
        icon: TbUsers
    },
    {
        label: "Logout",
        href: "#",
        icon: LuLogOut,
        onClick: () => signOut(),
    }
]

