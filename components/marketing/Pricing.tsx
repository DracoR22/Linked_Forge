'use client'

import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const Pricing = () => {

  const router = useRouter()

  return (
    <div id="pricing" className='w-full mb-[30px] mt-[70px] px-4'>
        <div className="mb-6">
            <h1 className="text-5xl font-bold">Pric<span className="text-indigo-500">ing</span></h1>
            <h3 className="text-lg text-gray-600 mt-3 font-medium">Choose the <span className="text-indigo-500">plan</span>  that&apos;s right for <span className="text-indigo-500">you</span></h3>
        </div>
    <div className='max-w-[940px] mx-auto grid md:grid-cols-2 gap-8'>
        <div className='w-full shadow-xl bg-white flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-indigo-500 text-2xl font-bold text-center py-8'>Free Plan</h2>
          <p className='text-center text-4xl font-bold'>FREE</p>
          <div className='text-start font-medium flex-1'>
            <p className='py-2 border-b mx-8 mt-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> Unlimited conversations</p>
            <p className='py-2 border-b mx-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> 50 messages per month</p>
            <p className='py-2 border-b mx-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> 1 free assistant</p>
          </div>
          <button onClick={() => router.push('/sign-up')} className='bg-indigo-500 w-[200px] rounded-md font-medium my-6 mx-auto py-3 px-6
            text-white hover:bg-indigo-600 transition duration-500 '>Sign Up</button>
        </div>
        
        <div className='w-full shadow-xl bg-white flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-indigo-500 text-2xl font-bold text-center py-8'>Pro Plan</h2>
          <p className='text-center text-4xl font-bold'>$29.99</p>
          <div className='text-start font-medium flex-1'>
            <p className='py-2 border-b mx-8 mt-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> Unlimited conversations</p>
            <p className='py-2 border-b mx-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> Up to 10k messages per month</p>
            <p className='py-2 border-b mx-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> Create up to 7 different assistants</p>
            <p className='py-2 border-b mx-8 flex items-center gap-x-4'><CheckCircle className="text-indigo-500"/> Priority email support</p>
          </div>
          <button onClick={() => router.push('/sign-up')} className='bg-indigo-500 w-[200px] rounded-md font-medium my-6 mx-auto py-3 px-6
            text-white hover:bg-600 transition duration-500'>Sign Up</button>
        </div>
    </div>  
</div>
  )
}

export default Pricing