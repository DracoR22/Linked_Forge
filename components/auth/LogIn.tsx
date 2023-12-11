'use client'

import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios"
import RegisterFormSchema from "@/lib/validations/register"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import ErrorInput from "@/components/ui/error-input"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react'
import LoginFormSchema from "@/lib/validations/login"
import { z } from "zod"

const LogIn = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
 
  const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
        email: '', password: ''
    }
 })

 const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true)
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        // TOAST
        router.refresh();
        router.push("/")
      }
      
      if (callback?.error) {
       // TOAST
       alert("invalid email or password")
      }
    });
  }
  return (
    <div className="grid lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)}className="mx-12">
        <h1 className="text-3xl font-medium pt-10">
          Log In
        </h1>
        <div className="pt-[27px]">
          {/* EMAIL */}
         <Label className="uppercase font-bold">
          Email
        </Label>
         <div className="py-3">
           <ErrorInput type="email" id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
         </div>
          {/* PASSWORD */}
         <Label className="uppercase font-bold">
          Password
        </Label>
         <div className="py-3">
         <ErrorInput type="password" id='password' label='Password' disabled={isLoading} register={register} errors={errors} required/>
         </div>

         {/* SUBMIT */}
         <div className="flex justify-center items-center w-full py-1">
            <Button className="w-full rounded-md py-7" variant="purple">
              Login
            </Button>
         </div>

         {/* SOCIAL LOGIN */}
         <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-t border-neutral-400" />
          <div className="text-neutral-400 text-xs">Or, continue with</div>
          <hr className="flex-grow border-t border-neutral-400" />
        </div>

             <Button onClick={(e) => { e.preventDefault() }} 
              className="w-full bg-neutral-900 text-white hover:bg-[#101010]">
               Continue with Google 
               <span className="ml-3">
               <FcGoogle />
               </span>
             </Button>
        </div>
      </form>

        {/* RIGHT BACKGROUND */}
        <div className="hidden lg:flex justify-center w-full h-screen bg-gradient-to-b from-indigo-400 to-indigo-900">
          <div className="flex items-center text-white">
             <div>
             <h2 className="text-4xl font-bold">
                 Welcome Back!
              </h2>
             <h3 className="text-lg font-medium pt-8 pb-6 flex justify-center">
                Dont&apos; have an account yet?
              </h3>
              <div className="flex justify-center">
              <Button onClick={() => router.push("/sign-ip")}
               className="py-[20px] px-6 bg-transparent hover:bg-indigo-600 border rounded-full border-white">
                Sign Up
              </Button>
              </div>
             </div>
          </div>
        </div>
    </div>
  )
}

export default LogIn