import {z} from "zod"

export const createUserSchema = z.object({
    name: z.string().min(2).regex(/[a-z-]/, {message: "invalid name please only use lowercase letters"}),
    email: z.string().email(),
    password: z.string().min(4, 'Password must be at least 4 characters long')
    .max(10, 'Password must not exceed 10 characters').regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
})