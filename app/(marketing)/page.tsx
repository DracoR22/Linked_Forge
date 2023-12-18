'use client'

import getSession from "@/actions/get-session";
import { getCsrfToken } from "next-auth/react"
import { cookies } from 'next/headers';
import { useLocalStorage } from "usehooks-ts";

const MarketingPage = () => {
  
  // const csrf = cookies().get('next-auth.csrf-token')?.value.split('|')[0]
  // console.log(csrf)
  
  return (
   <div>

   </div>
  )
};

export default MarketingPage