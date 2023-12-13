'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorInput from "../ui/error-input"
import axios from "axios"
import RegisterFormSchema from "@/lib/validations/register"
import { useRouter } from "next/navigation"

const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
 
  const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
     resolver: zodResolver(RegisterFormSchema),
     defaultValues: {
         name: '', email: '', hashedPassword: ''
     }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then((response) => {
        // toast.success('Registered!')
        const activationToken = response.data.activationToken;
        router.push(`/account-activation/${activationToken}`)
    })
    
    .finally(() => {setIsLoading(false)})
 }
 
  return (
    <div className="grid lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
        <h1 className="text-3xl font-medium pt-10">
          Sign Up
        </h1>
        <div className="pt-[27px]">
          {/* USERNAME */}
        <Label className="uppercase font-bold">
          Name
        </Label>
         <div className="py-3">
           <ErrorInput id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
         </div>
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
         <ErrorInput type="password" id='hashedPassword' label='Password' disabled={isLoading} register={register} errors={errors} required/>
         </div>

         {/* SUBMIT */}
         <div className="flex justify-center items-center w-full py-1">
            <Button type="submit" className="w-full rounded-md py-7" variant="purple">
              Sign Up
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
                 Welcome to Linked Forge
              </h2>
             <h3 className="text-lg font-medium pt-8 pb-6 flex justify-center">
                Already have an account?
              </h3>
              <div className="flex justify-center">
              <Button onClick={() => router.push("/login")}
               className="py-[20px] px-6 bg-transparent hover:bg-indigo-600 border rounded-full border-white">
                Login
              </Button>
              </div>
             </div>
          </div>
        </div>
    </div>
  )
}

export default SignUp