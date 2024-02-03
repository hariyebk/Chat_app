"use client"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Avatar from "./Avatar"

interface UserItemProps {
    user: User
}

export default function UserItem({user}: UserItemProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(){
        setIsLoading(true)
        try{
            // Create a new conversation with the clicked user or get the existing conversation .
            const conversation = await axios.post("/api/conversations", {
                userId: user.id
            })
            // redirect the user to that conversation.
            router.push(`/convs/${conversation.data.id}`)
        }
        catch(error: any){
            console.log(error.response.data)
            toast.error(error.response.data || "something went wrong")
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-[74px] relative bg-white hover:bg-gray-100 rounded-lg transition cursor-pointer px-5" onClick={handleClick}>
            <div className="flex items-center justify-center space-x-3">
                <Avatar user={user} />
                <div className="flex flex-1 items-center justify-between focus:outline-none mb-14">
                    {user.name}
                </div>
            </div>
        </div>
    )
}
