import { z } from "zod"

const assistantNameSchema = z.object({
    name: z.string().min(1, { message: "Your assistant needs a name!"})
})

export default assistantNameSchema