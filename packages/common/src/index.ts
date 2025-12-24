import z from "zod";

export const signUpSchema = z.object({
    email:z.email(),
    password:z.string().min(3).max(15),
    name:z.string().min(3)
})

export const signInSchema = z.object({
    email:z.email().min(3),
    password:z.string().min(4),
})

export const roomSchema = z.object({
    name:z.string().min(2).max(15),
    
})
