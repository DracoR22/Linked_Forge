import { z } from "zod"

const ResetPasswordFormSchema = z.object({
    newPassword: z.string()
    .min(8)
    .refine(value => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    }),
    confirmPassword: z.string()
    .min(8)
    .refine(value => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    }),
 })

 export default ResetPasswordFormSchema