import { z } from "zod"

const assistantPlaceHolderSchema = z.object({
    placeholder: z.string().min(1, { message: "Your assistant needs a placeholder!"})
})

export default assistantPlaceHolderSchema