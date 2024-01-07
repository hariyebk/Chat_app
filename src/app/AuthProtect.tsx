"use client"

import { sessionStatus } from "@/constants"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthProtectProps {
    children: React.ReactNode
}
export default function AuthProtect({children}: AuthProtectProps) {
    const session = useSession()
    const router = useRouter()
    async function checkAuthStatus(){
        if(session.status === sessionStatus.authenticated){
            router.push("/users")
        }
        else if(session.status === sessionStatus.unauthenticated){
            router.push("/")
        }
    }
    useEffect(() => {
        checkAuthStatus()
    })
    if(session.status !== sessionStatus.loading){
        return (
            <div className="h-full">
                {children}
            </div>
        )
    }
}
