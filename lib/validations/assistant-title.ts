import { z } from "zod"

const assistantTitleSchema = z.object({
    title: z.string().min(1, { message: "Provide a title for your assistant"})
})

export default assistantTitleSchema