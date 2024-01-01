'use client'

import Hint from "@/components/Hint"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoaderButton } from "@/components/ui/loader-button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import assistantInstructionsSchema from "@/lib/validations/assistant-instructions"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { HelpCircle, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { z } from "zod"

interface InstructionsFormProps {
    initialData: any
    assistantId: string
}

const InstructionsForm = ({ initialData, assistantId }: InstructionsFormProps) => {

    const router = useRouter()
    const { toast } = useToast()

    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"div">>(null)

    const disableEdit = () => {
      return setIsEditing(false)
    }

    const toggleEdit = () => setIsEditing((current) => !current)

    // CLOSE FORM WHEN PRESS ESC KEY
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsEditing(false)
        }
      }

    const form = useForm<z.infer<typeof assistantInstructionsSchema>>({
        resolver: zodResolver(assistantInstructionsSchema),
        defaultValues: {
            instructions: initialData?.instructions || ''
        }
     })

     const { isSubmitting, isValid } = form.formState

     const onSubmit = async (values: z.infer<typeof assistantInstructionsSchema>) => {

        if (values.instructions === initialData.instructions) {
            return toggleEdit()
        }

        try {
            await axios.patch(`/api/assistant/${assistantId}`, values)
            toggleEdit()
            router.refresh()
            toast({
                title: `New instructions added!`,
                description: 'Go to the Overview page to link your assistant'
            })
        } catch (error: any) {
            const errorMessage = error.response.data || 'An error occurred';
            toast({
                variant: 'destructive',
                title: errorMessage
            })
        }
     }

     // CLOSE FORM WHEN CPRESSING ESC OR CLICKING OUTSIDE
     useOnClickOutside(formRef, disableEdit)
     useEventListener("keydown", onKeyDown)


  return (
    <div ref={formRef} className="border bg-indigo-500/10 rounded-md p-4">
    <div className="flex justify-end -mt-2 pb-1">
    <Hint sideOffset={40} description={`Give your assistant all the information it needs to provide accurate answers to each question. The more context you give, the better your assistant responses will be`}>
       <HelpCircle className=" h-[14px] w-[14px]"/>
     </Hint>
     </div>
  <div className="font-semibold flex items-center justify-between">
    Assistant instructions
    <Button variant="ghost" onClick={toggleEdit} className="text-semibold">
        {isEditing ? (
            <>
              Cancel
            </>
        ) : (
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit instructions
            </>
         )}
    </Button>
  </div>
  {!isEditing && (
        <p className={cn(`text-sm mt-2 text-neutral-600 truncate`, !initialData.instructions && "text-slate-500 italic")}>
          {initialData.instructions || "No instructions"}
        </p>
      )}
  {isEditing && (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField control={form.control} name="instructions" render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Textarea placeholder="e.g 'You are an assistant in charge of a pet products web store, your job is to provide users with information about our latest products, this is a list of our newest products: Cozy Canine Bed: A plush and comfortable bed for your furry friend to snuggle into. Perfect for a good night's sleep. Whisker Wonderland Cat Tree: A multi-level cat tree featuring scratching posts, cozy hideaways, and dangling toys for endless feline fun. Pawsome Playtime Toy Set: A collection of squeaky toys, chew bones, and interactive playthings to keep your pet entertained and active. Feathered Friends Bird Cage: A spacious and secure cage for your feathered companions, complete with perches and toys for a happy bird.'"
                     className="focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
                     disabled={isSubmitting} {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}/>
        <div className="flex items-center gap-x-2">
          <LoaderButton isLoading={isSubmitting} disabled={!isValid} type="submit" variant="purple">
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  )}
</div>
  )
}

export default InstructionsForm