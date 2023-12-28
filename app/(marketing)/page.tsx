

import Footer from "@/components/marketing/Footer";
import Heading from "@/components/marketing/Heading";
import Pricing from "@/components/marketing/Pricing";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const MarketingPage = async () => {

  const session = await getServerSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
   <div className="min-h-full flex flex-col">
    {/* COLOR CONTAINER */}
    <div className='relative isolate'>
          <div aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
             <div style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>
          </div>

     <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading/>
        <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                 <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                 <Image src='/landing/linked6.png' alt='product preview' width={1364} height={866}
                 quality={100} className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'/>
                 </div>
              </div>
            </div>
          </div>

          <div id="get-started" className='mb-12 mt-20 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='mt-2 font-bold text-3xl text-gray-900 sm:text-5xl'>
              Start chatting in <span className="text-indigo-500">minutes</span> 
            </h2>
            <p className='mt-4 text-lg text-gray-600 font-medium'>
              Having your own AI chatbot assistant for your website has never been
               easier than with <span className="text-indigo-500">Linked Forge AI</span>. 
            </p>
          </div>
        </div>
        {/* <GetStarted/> */}
        {/* Steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-semibold text-indigo-500'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-700'>
                You can get started for free starting out with our free plan
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-semibold text-indigo-500'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Create your assistant
              </span>
              <span className='mt-2 text-zinc-700'>
                Creating and giving instructions to your assistant is all you need to use it in your website
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-semibold text-indigo-500'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Paste the code in your website
              </span>
              <span className='mt-2 text-zinc-700'>
                Now your assistant will be placed at the bottom right corner of your website ready to start chatting with your clients
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/landing/linked5.png'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
        <Pricing/>
     </div>
     <Footer/>
   </div>
  )
};

export default MarketingPage