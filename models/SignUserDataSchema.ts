import { z } from 'zod'

export const SignUserDataSchema = z.object({
    email: z.string().trim().toLowerCase().email({ message: "Invalid email address" }), 
    password: z.string().trim().min(6, { message: "Must be 5 or more characters long" })
    })



export type SignUserData = z.infer<typeof SignUserDataSchema>

