'use client'

import Hint from "@/components/Hint"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoaderButton } from "@/components/ui/loader-button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import assistantTitleSchema from "@/lib/validations/assistant-title"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { HelpCircle, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { z } from "zod"

interface TitleFormProps {
    initialData: any
    assistantId: string
}

const TitleForm = ({ initialData, assistantId }: TitleFormProps) => {

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

    const form = useForm<z.infer<typeof assistantTitleSchema>>({
        resolver: zodResolver(assistantTitleSchema),
        defaultValues: {
            title: initialData?.title || ''
        }
     })

     const { isSubmitting, isValid } = form.formState

     const onSubmit = async (values: z.infer<typeof assistantTitleSchema>) => {

        if (values.title === initialData.title) {
            return toggleEdit()
        }

        try {
            await axios.patch(`/api/assistant/${assistantId}`, values)
            toggleEdit()
            router.refresh()
            toast({
                title: `${values.title} has been added as a title!`
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
    <div ref={formRef} className="mt-6 border bg-indigo-500/10 rounded-md p-4">
    <div className="flex justify-end -mt-2 pb-1">
    <Hint sideOffset={40} description={`This will be the public title of your chat widget`}>
       <HelpCircle className=" h-[14px] w-[14px]"/>
     </Hint>
     </div>
  <div className="font-semibold flex items-center justify-between">
     Widget&apos;s title
    <Button variant="ghost" onClick={toggleEdit} className="text-semibold">
        {isEditing ? (
            <>
              Cancel
            </>
        ) : (
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit title
            </>
         )}
    </Button>
  </div>
  {!isEditing && (
        <p className={cn(`text-sm mt-2 text-neutral-600`, !initialData.title && "text-slate-500 italic")}>
          {initialData.title || "Chat Support"}
        </p>
      )}
  {isEditing && (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input className="focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
                     disabled={isSubmitting} placeholder="e.g 'Chat Support'" {...field}/>
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

export default TitleForm