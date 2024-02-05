"use client"

import { HiMiniPhoto } from "react-icons/hi2";
import { IoSend} from "react-icons/io5";
import axios from "axios"
import { useParams} from "next/navigation"
import { FieldValues, useForm } from "react-hook-form"

export default function MessageForm(){
    // Get the conversation Id from URL 
    const {id: conversationId} = useParams()

    const {register, reset, handleSubmit, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    })

    async function onSubmit(values: FieldValues){
        // reset the Input field
        reset()

        try{
            // Making an Api post request that adds a new message to the conversation
            const newMessage = await axios.post('/api/messages', {
                ...values,
                conversationId
            })
        }
        catch(error: any){
            console.log(error.message)
        }
    }

    return (
        <div className="max-lg:px-6 px-10 py-4 bg-white  border-t flex items-center gap-2 lg:gap-4 w-full max-lg:mb-20">
            {/* For sending an Image */}
            <button className="text-sky-500 cursor-pointer">
                <HiMiniPhoto size = {25} />
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                {/* Input field */}
                <div className="relative w-full">
                    <input id="message" type="text" autoComplete="message" placeholder="write a message" {...register("message", {required: true})} className="text-black font-light py-3 px-4 bg-neutral-100 w-full rounded-full focus:outline-none" />
                </div>
                {/* Send button */}
                <button type="submit" className="bg-sky-500 rounded-full p-2 cursor-pointer text-white hover:bg-sky-600 transition"> 
                    <IoSend size = {20}/>
                </button>
            </form>
        </div>
    )
}
