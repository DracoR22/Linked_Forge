import { z } from "zod"

const assistantImageSchema = z.object({
    image: z.string().min(1, { message: "Upload an image" })
})

export default assistantImageSchema