'use client'

import UseScrollTop from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useRef } from "react"
import Pricing from "./Pricing"

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
})

const Navbar = () => {

  const scrolled = UseScrollTop()
  const router = useRouter()

  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    // Check if the ref is available and then scroll to it
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex w-full p-4 transition-all",
    scrolled && "border-b shadow-sm bg-white/75 backdrop-blur-lg")}>
      {/* LOGO */}
       <div className="hidden md:flex items-center gap-x-4 cursor-pointer">
         <Image src="/ultimate.svg" height={50} width={50} alt="Logo" className="rounded-full"/>
         <p className={cn("font-semibold text-xl", font.className)}>
           Linked <span className="text-indigo-500">Forge AI</span>
         </p>
       </div>

       {/* SIGN IN AND UP */}
       <div className="md:ml-auto md:justify-end justify-between flex items-center gap-x-2">
         <div>
             <Button asChild variant='ghost' className="font-semibold">
              <Link href={'#pricing'}>
                  Pricing
              </Link>
             </Button>
         </div>
        
          <div>
             <Button variant='ghost' className="font-semibold" onClick={() => router.push('/log-in')}>
               Login
             </Button>
          </div>

          <div>
             <Button variant='purple' className="font-semibold" onClick={() => router.push('/sign-up')}>
               Register
             </Button>
          </div>
       </div>
    </nav>
  )
}

export default Navbar