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
import useActivateAccountModal from "@/hooks/use-activate-account"
import { LoaderButton } from "../ui/loader-button"
import { useToast } from "../ui/use-toast"
import { signIn } from "next-auth/react"

const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { toast } = useToast()

  const activationModal = useActivateAccountModal()
 
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
        activationModal.onOpen({activationToken})
    })
    .catch((error) => {
      const errorMessage = error.response.data || 'An error occurred';
        toast({
            variant: 'destructive',
            title: errorMessage
        })
    })
    
    .finally(() => {setIsLoading(false)})
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
      <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
        <h1 className="text-3xl font-bold pt-10">
          Welcome to Linked <span className="text-indigo-500">Forge</span>
        </h1>
        <p className="mt-4 text-neutral-600 text-sm">
          Create an account to start building custom AI assistants!
        </p>
        <div className="pt-[27px]">
          {/* USERNAME */}
        <Label className="uppercase font-semibold">
          Name
        </Label>
         <div className="py-3">
           <ErrorInput id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
         </div>
          {/* EMAIL */}
         <Label className="uppercase font-semibold">
          Email
        </Label>
         <div className="py-3">
           <ErrorInput type="email" id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
         </div>
          {/* PASSWORD */}
         <Label className="uppercase font-semibold">
          Password
        </Label>
         <div className="py-3">
         <ErrorInput type="password" id='hashedPassword' label='Password' disabled={isLoading} register={register} errors={errors} required/>
         {errors.hashedPassword && (
          <p className="text-xs text-red-500 text-medium mt-2">
            Password must be at least 8 characters long and contain at least one uppercase letter.
          </p>
         )}
         </div>

         {/* SUBMIT */}
         <div className="flex justify-center items-center w-full py-1">
            <LoaderButton isLoading={isLoading} type="submit" className="w-full rounded-md py-7" variant="purple">
              Sign Up
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
                 Welcome to Linked Forge
              </h2>
             <h3 className="text-lg font-medium pt-8 pb-6 flex justify-center">
                Already have an account?
              </h3>
              <div className="flex justify-center">
              <Button onClick={() => router.push("/log-in")}
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