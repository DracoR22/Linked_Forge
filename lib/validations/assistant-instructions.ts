import { z } from "zod"

const assistantInstructionsSchema = z.object({
    instructions: z.string().min(20, { message: "Instructions are too short" }).max(700, { message: 'Instructions are too long' })
})

export default assistantInstructionsSchema