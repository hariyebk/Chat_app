"use client"

import { sessionStatus } from "@/constants"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthProtectProps {
    children: React.ReactNode
}
export default function AuthProtect({children}: {children: React.ReactNode}) {
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
    return (
        <div>
            {children}
        </div>
    )
}
