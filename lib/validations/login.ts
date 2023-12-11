import { z } from "zod"

const LoginFormSchema = z.object({
    email: z.string().email("Invalid email format").min(3),
    password: z.string().min(6)
 })

 export default LoginFormSchema