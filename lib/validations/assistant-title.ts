import { z } from "zod"

const assistantTitleSchema = z.object({
    title: z.string().min(1, { message: "Provide a title for your assistant"}).max(25, { message: "Title can't be more than 25 characters"})
})

export default assistantTitleSchema