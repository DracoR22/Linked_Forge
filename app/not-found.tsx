import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="my-6">
          <Image src={'/ultimate.svg'} alt="LinkedForgeAi" width={500} height={500} className="w-[70px] rounded-full"/>
        </div>
       <h1 className="text-2xl font-bold mb-4">Page not <span className="text-indigo-500">found</span></h1>
       <p className="text-gray-600 font-medium text-center">Oops! The page you are looking for might be under construction or does not exist.</p>
       <a href="/" className="text-indigo-500 mt-8 hover:text-indigo-600 font-medium flex items-center gap-x-3">
            <ArrowLeft/>
          Go back to the homepage
        </a>
     </div>
    )
  }
  
  export default NotFound