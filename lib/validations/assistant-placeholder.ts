import { z } from "zod"

const assistantPlaceHolderSchema = z.object({
    placeholder: z.string().min(1, { message: "Your assistant needs a placeholder!"}).max(30, { message: "Title can't be more than 30 characters"})
})

export default assistantPlaceHolderSchema