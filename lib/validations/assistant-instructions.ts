import { z } from "zod"

const assistantInstructionsSchema = z.object({
    instructions: z.string().min(20, { message: "Instructions are too short" }).max(10000, { message: 'Instructions are too long' })
})

export default assistantInstructionsSchema