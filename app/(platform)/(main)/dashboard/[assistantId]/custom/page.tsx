import getUserAssistantIdCustom from "@/actions/get-user-assistant-id-custom"

import Info from "@/components/assistants/Info"
import InstructionsForm from "@/components/assistants/custom/InstructionsForm"
import NameForm from "@/components/assistants/custom/NameForm"
import TitleForm from "@/components/assistants/custom/TitleForm"
import { Separator } from "@/components/ui/separator"

const CustomPage = async ({ params } : { params: { assistantId: string } }) => {

  const assistant = await getUserAssistantIdCustom(params)

  if (!assistant) {
    return <div>Skeleton</div>
  }

  const requiredFields = [
    assistant.name,
    assistant.title,
    assistant.instructions
  ]

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <div className="w-full">
      <Info assistant={assistant}/>
      <Separator className="my-2"/>

      <div className="flex items-center justify-between mt-6">
         <div className="flex flex-col gap-y-2">
           <h1 className="text-2xl font-medium">
             Customize your assistant
           </h1>
           <span className="text-sm text-slate-700">
              {completionText} Fields completed
           </span>
         </div>
         {/* <Actions disabled={!isComplete} courseId={params.courseId} isPublished={course.isPublished}/> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div>
          <NameForm initialData={assistant} assistantId={assistant.id}/>
          <TitleForm initialData={assistant} assistantId={assistant.id}/>
        </div>
        <div className="space-y-6">
            <div>
              <InstructionsForm initialData={assistant} assistantId={assistant.id}/>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                 {/* <IconBadge icon={CircleDollarSign}/> */}
                 {/* <h2 className="text-xl">
                   Sell your course
                 </h2> */}
              </div>
              {/* <PriceForm initialData={course} courseId={course.id}/> */}
            </div>
            <div>
              
              {/* <AttachmentForm initialData={course} courseId={course.id}/> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default CustomPage