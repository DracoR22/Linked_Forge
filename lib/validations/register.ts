import { z } from "zod"

const RegisterFormSchema = z.object({
    email: z.string().email("Invalid email format").min(3),
    name: z.string().min(1, { message: 'Provide your name'}),
    hashedPassword: z.string()
    .min(8)
    .refine(value => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    }),
 })

 export default RegisterFormSchema