'use client'

import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import ErrorInput from "@/components/ui/error-input"
import { Button } from "@/components/ui/button"
import { signIn, useSession } from 'next-auth/react'
import LoginFormSchema from "@/lib/validations/login"
import { useToast } from "../ui/use-toast"
import { LoaderButton } from "../ui/loader-button"

const LogIn = () => {

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { data: session } = useSession();

  const { toast } = useToast()

 
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

      if (callback?.ok && !callback?.error) {
        // TOAST
        router.refresh();
        setIsLoading(false);
        router.push('/dashboard')
      }
      
      if (callback?.error) {
       toast({
        variant: 'destructive',
        title: callback.error
       })
       setIsLoading(false);
      }
    });
  }

  const socialAuth = async (e: any) => {
    e.preventDefault();

    try {
      await signIn('google', { callbackUrl: '/dashboard '});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)}className="mx-12">
        <h1 className="text-3xl font-bold pt-10">
          Welcome <span className="text-indigo-500"> Back! </span>
        </h1>
        <p className="mt-4 text-neutral-600 text-sm">
          We are glad to see you again!
        </p>
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
            <LoaderButton isLoading={isLoading} className="w-full rounded-md py-7" variant="purple">
              Login
            </LoaderButton>
         </div>

         {/* SOCIAL LOGIN */}
         <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-t border-neutral-400" />
          <div className="text-neutral-400 text-xs">Or, continue with</div>
          <hr className="flex-grow border-t border-neutral-400" />
        </div>

        <Button onClick={socialAuth} 
               className="gap-x-4 w-full font-semibold py-6 bg-white text-black border border-neutral-500 hover:bg-neutral-200 transition">
                <span className="ml-3">
               <FcGoogle className="h-5 w-5"/>
               </span>
               Continue with Google 
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
              <Button onClick={() => router.push("/sign-up")}
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