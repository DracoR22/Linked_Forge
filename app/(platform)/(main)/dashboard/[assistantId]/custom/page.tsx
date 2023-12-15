import Custom from "@/components/assistants/Custom"
import Info from "@/components/assistants/Info"
import { Separator } from "@/components/ui/separator"

const CustomPage = () => {

  return (
    <div className="w-full">
      <Info/>
      <Separator className="my-2"/>
      <Custom/>
    </div>
  )
}

export default CustomPage