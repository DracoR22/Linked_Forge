'use client';

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";


interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <div className="flex flex-col items-center justify-center h-screen">
       <div className="my-6">
          <Image src={'/ultimate.svg'} alt="LinkedForgeAi" width={500} height={500} className="w-[70px] rounded-full"/>
        </div>
      <h1 className="text-2xl font-bold mb-4"><span className="text-indigo-500">Error:</span> {error.message}</h1>
      <p className="text-gray-600">An error occurred while trying to access this page.</p>
      <p className="text-gray-600 mt-2">Please try again later or contact support if the problem persists.</p>
      <div className="mt-6">
        <a href="/" className="text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-x-3">
            <ArrowLeft/>
          Go back to the homepage
        </a>
      </div>
  </div>
   );
}
 
export default ErrorState;