"use client"
import clsx from "clsx"
import {FieldValues, FieldErrors, UseFormRegister} from "react-hook-form"
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

interface InputProps {
    label?: string,
    id: string,
    type?: string,
    required?: boolean,
    placeholder?: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

export default function Input({label, id, type, required, placeholder, register, errors, disabled}: InputProps) {
    const [show, setShow] = useState(false)
    const isInputTypePassword = type === "password"
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900" > {label} </label>
            <div className={`flex items-center justify-between mt-2 ${ isInputTypePassword && "form-input block w-full rounded-md border-0 py-1.5 pr-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 "}`}>
                <input id={id} type={isInputTypePassword && show ? "text": type} autoComplete={isInputTypePassword ? "current-password": id} placeholder={placeholder} disabled = {disabled} {...register(id, {required})} className={isInputTypePassword ? "w-full outline-none" : clsx("form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ", errors[id] && 'focus:ring-rose-500', disabled && "opacity-50 cursor-default")} />
                {isInputTypePassword && (
                    <button type="button" onClick={() => setShow((show) => !show)}>
                        {show ? <FaRegEye /> : <IoEyeOffOutline />}
                    </button>
                ) 
                }
            </div>
        </div>
    )
}
