'use client'

import Hint from "@/components/Hint"
import { Button } from "@/components/ui/button"
import { LoaderButton } from "@/components/ui/loader-button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

import axios from "axios"
import { HelpCircle, ImageIcon, Pencil, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"


interface ImageFormProps {
    initialData: any
    assistantId: string
}

const ImageForm = ({ initialData, assistantId }: ImageFormProps) => {

    const router = useRouter()
    const { toast } = useToast()

    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isloadingDelete, setIsLoadingDelete] = useState(false)

     // UPLOAD IMAGE
     const handleFileInputChange = (e: any) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result as string);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };


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

     const handleSubmit = async (e: any) => {

        if (!image) {
          return
        }

        setIsLoading(true)
        try {
          await axios.post(`/api/assistant/${assistantId}/image`, { image })
          toast({
            title: 'Image uploaded!'
          })
          router.refresh()
          setIsEditing(false)
        } catch (error: any) {
          const errorMessage = error.response.data || 'An error occurred';
          toast({
              variant: 'destructive',
              title: errorMessage
          })
        } finally {
          setIsLoading(false)
        }
      }

      const handleDelete = async () => {
         if (!initialData.image) {
          return
         }

         setIsLoadingDelete(true)

         try {
          await axios.delete(`/api/assistant/${assistantId}/image`)
          toast({
            title: 'Image removed'
          })
          setIsEditing(false)
          router.refresh()
          setImage('')
         } catch (error: any) {
          const errorMessage = error.response.data || 'An error occurred';
          toast({
              variant: 'destructive',
              title: errorMessage
          })
         } finally {
          setIsLoadingDelete(false)
         }
      }

     // CLOSE FORM WHEN CPRESSING ESC OR CLICKING OUTSIDE
     useOnClickOutside(formRef, disableEdit)
     useEventListener("keydown", onKeyDown)

  return (
    <div ref={formRef} className="mt-6 border bg-indigo-500/10 rounded-md p-4">
    <div className="flex justify-end -mt-2 pb-1">
    <Hint sideOffset={40} description={`Give your assistant an avatar picture to look more unique!`}>
       <HelpCircle className=" h-[14px] w-[14px]"/>
     </Hint>
     </div>
  <div className="font-semibold flex items-center justify-between">
    Assistant avatar
    <LoaderButton isLoading={isloadingDelete} variant="ghost" onClick={toggleEdit} className="text-semibold">
        {isEditing ? (
            <>
              Cancel
            </>
        ) : (
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit avatar
            </>
         )}
    </LoaderButton>
  </div>
  {!isEditing && (
        !initialData.image ? (
            <div className="flex mt-4 items-center justify-center h-60 bg-indigo-500/20 rounded-md">
               <ImageIcon className="h-10 w-10 text-slate-500"/>
            </div>
          ) : (
            <div className="relative aspect-video mt-4">
              <Image alt="Upload" fill className="object-cover rounded-md" src={initialData.image.url}/>
            </div>
          )
      )}
  {isEditing && (
    <div className="mt-4">

       {image && !initialData.image && (
        <div className="flex group relative items-center justify-center h-60 bg-indigo-500/20 rounded-md">
             <button disabled={isLoading} className="absolute top-2 right-2" onClick={() => setImage('')}>
             <div className={cn(`opacity-0 group-hover:opacity-100 transition-transform 
             cursor-pointer p-2 text-white bg-neutral-900/20
             rounded-full`, isLoading && "cursor-default")} >
               <X/>
             </div>
          </button>
         <Image width={500} height={500} src={image} alt="image" className="h-full w-full object-cover"/>
       </div>
       )}

       {!image && !initialData.image &&  (
        <>
        <label htmlFor="image" className="flex items-center justify-center h-60 bg-indigo-500/30 rounded-md cursor-pointer">
        <input type="file" id="image" accept=".jpg, .jpeg, .png, .webp"  className="hidden" onChange={handleFileInputChange}/>
        <div className="flex flex-col items-center">
        <ImageIcon className="h-10 w-10 text-slate-500"/>
        <p className="text-neutral-700 text-xs pt-4">
          Click here to upload
        </p>
        </div>
       </label>
       </>
       )}

       {initialData.image && (
        <div className="relative flex items-center justify-center group h-60 bg-indigo-500/20 rounded-md">
          <button disabled={isloadingDelete} className="absolute top-2 right-2" onClick={handleDelete}>
             <div className={cn(`opacity-0 group-hover:opacity-100 transition-transform 
             cursor-pointer p-2 text-white bg-neutral-900/20
             rounded-full`, isloadingDelete && 'cursor-default')}>
               <X/>
             </div>
          </button>
        <Image width={500} height={500} src={initialData?.image?.url} alt="image" className="h-full w-full object-cover"/>
        </div>
       )}

       <div className="mt-4 flex items-center gap-x-2">
        <LoaderButton disabled={isLoading || isloadingDelete} isLoading={isLoading} onClick={handleSubmit} type="submit" variant="purple"
        className={cn(image === null || !image || isloadingDelete  && "cursor-default bg-indigo-500/70 hover:bg-indigo-500/70")}>
          Save
       </LoaderButton>
      </div>
    </div>
  )}
</div>
  )
}

export default ImageForm