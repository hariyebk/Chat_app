"use client"
import { sessionStatus } from "@/constants";
import {  signOut, useSession} from "next-auth/react";

export default function page() {
    const session = useSession()
    if(session.status === sessionStatus.loading){
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                loading...
            </div>
        )
    }
    else if(session.status === sessionStatus.authenticated){
        return (
            <button onClick={() => {
                signOut()
            }}>
                Logout
            </button>
        )
    }
}
