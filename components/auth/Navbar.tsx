'use client'

import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full px-4 border-b shadow-sm bg-white flex items-center">
       <div className="flex items-center gap-x-4">
       <Link href={'/'} className="hidden md:flex my-2 cursor-pointer">
           <Image src={'/ultimate.svg'} alt="LinkedForgeAi" width={500} height={500} className="w-[50px] rounded-full"/>
        </Link>
       </div>
    </nav>
  )
}

export default Navbar