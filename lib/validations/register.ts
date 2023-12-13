import { z } from "zod"

const RegisterFormSchema = z.object({
    email: z.string().email("Invalid email format").min(3),
    name: z.string().min(3),
    hashedPassword: z.string().min(6)
 })

 export default RegisterFormSchema