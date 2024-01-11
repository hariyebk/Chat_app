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
        // fetch all the associated conversations with the selected user.
        const conversation = await axios.post("/api/conversations", {
            userId: user.id
        })
        router.push(`/convs/${conversation.data.id}`)
        }
        catch(error: any){
            console.log(error.response.data || "something went wrong")
            toast.error(error.response.data || "something went wrong")
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full relative bg-white hover:bg-gray-100 rounded-lg transition cursor-pointer px-5" onClick={handleClick}>
            <div className="flex items-center justify-center space-x-3">
                <Avatar user={user} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900 mb-14">
                                {user.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
