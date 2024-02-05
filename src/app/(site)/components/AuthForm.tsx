"use client"

import { useState } from "react"
import { useForm, FieldValues} from "react-hook-form"
import Input from "./inputs/Input"
import Button from "./Button"
import AuthSocialButton from "./AuthSocialButton"
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import toast from "react-hot-toast"
import { signIn} from "next-auth/react"
import { useRouter } from "next/navigation"


type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm() {
    const [variant, setVariant] = useState<Variant>("LOGIN")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    function toggleVariant(){
        reset()
        if(variant === "LOGIN"){
            setVariant("REGISTER")
        }
        else{
            setVariant("LOGIN")
        }
    }
    // React-hok-form
    const {register, reset, handleSubmit, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(data: FieldValues){
        setIsLoading(true)
        if(variant === "REGISTER"){
            try{
                await axios.post("/api/register", data)
                // Login the user Immeditly after they have registered.
                await signIn("credentials", data)
                toast.success("Registration successfull")
                router.push("/users")
                }
            catch(error: any){
                console.log(error)
                toast.error(error.response.data || "something went wrong")
            }
            finally{
                setIsLoading(false)
            }
        }
        else{
            try{
                // Nextauth signin with email and password
                const result = await signIn("credentials", {
                    ...data,
                    redirect: false
                })
                // If the sign in failed
                if(result?.error){
                    console.log(result.error)
                    return toast.error(result.error)
                }
                else if (!result?.error && result?.ok){
                    reset()
                    toast.success("Logged in")
                    return router.push("/users")
                }
            }
            catch(error: any){
                console.log(error)
                toast.error(error.response.data || "something went wrong")
            }
            finally{
                setIsLoading(false)
            }
        }
    }

    async function socialAction(action: string){
        setIsLoading(true)
        try{
            const result = await signIn(action, { redirect: false })
            // If the social signin failed for some reason
            if(result?.error){
                console.log(result.error)
                toast.error(result.error)
            }
            else if(!result?.error && result?.ok){
                console.log(result)
                toast.success("signed in")
                router.push("/users")
            }
        }
        catch(error: any){
            console.log(error)
            toast.error(error.response.data || "something went wrong")
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
                <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        <Input id="name" label="Name" register={register} errors={errors} disabled = {isLoading} />
                    ) }
                    {/* Email and Password is common fot both Login and Resiter */}
                    <Input id="email" label="Email address" register={register} errors={errors} disabled = {isLoading} />
                    <Input id="password" label="Password" type="password" register={register} errors={errors} disabled = {isLoading} />
                    <div>
                        <Button disabled = {isLoading} fullWidth type="submit">
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    {/* Continue With Line */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                or countinue with
                            </span>
                        </div>
                    </div>
                    {/* Social loign buttons */}
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={FaGithub} onClick={() => socialAction("github")} />
                        <AuthSocialButton icon={FcGoogle} onClick={() => socialAction("google")} />
                    </div>
                </div>
                <div className="flex gap-4 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "LOGIN" ? "New to messenger" : "Already have an account ?"}
                    </div>
                    <div onClick={toggleVariant}
                    className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? "Create an account" : "Login"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
