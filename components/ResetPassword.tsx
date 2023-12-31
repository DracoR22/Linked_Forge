'use client'

import { useState } from "react";
import { Input } from "./ui/input";
import { LoaderButton } from "./ui/loader-button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ResetPasswordFormSchema from "@/lib/validations/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "./ui/error-input";

interface ResetPasswordProps {
    resetLink: string
}

const ResetPassword = ({ resetLink }: ResetPasswordProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { toast } = useToast()
    const router = useRouter()

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            newPassword: '', confirmPassword: ''
        }
     })
  
    // Function to handle the form submission
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const newPassword = data.newPassword
        const confirmPassword = data.confirmPassword
  
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        return toast({
            variant: 'destructive',
            title: 'Passwords do not match'
        })
      }
  
      // Handle password reset logic here
      try {
        setIsLoading(true)
        await axios.patch("/api/reset-password", { newPassword, confirmPassword, resetLink })
        toast({
            title: 'Password updated!',
            description: 'Now you can login with your new password'
        })
        router.push('/log-in')
        
       } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data || 'An error occurred';
            toast({
                variant: 'destructive',
                title: errorMessage
            })
        } else {
            console.error('Error:', error.message);
        } 
       } finally {
        setIsLoading(false)
    }
    };

  return (
    <div className="container mx-auto mt-[200px] p-6 bg-white shadow-md max-w-md">
    <h1 className="text-2xl mb-10 font-semibold">Reset Your <span className="text-indigo-500">Password</span></h1>
    
    {/* Reset Password Form */}
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* New Password Input */}
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
        <ErrorInput type="password" id='newPassword' label='Password' disabled={isLoading} register={register} errors={errors} required/>
         {errors.newPassword && (
          <p className="text-xs text-red-500 text-medium mt-2">
            Password must be at least 8 characters long and contain at least one uppercase letter.
          </p>
         )}
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
        <ErrorInput type="password" id='confirmPassword' label='Password' disabled={isLoading} register={register} errors={errors} required/>
         {errors.confirmPassword && (
          <p className="text-xs text-red-500 text-medium mt-2">
            Password must be at least 8 characters long and contain at least one uppercase letter.
          </p>
         )}
      </div>

      {/* Submit Button */}
      <div className="mb-4">
        <LoaderButton isLoading={isLoading} variant='purple' type="submit" className="p-2 rounded-md w-full">
          Reset Password
        </LoaderButton>
      </div>
    </form>
  </div>
  )
}

export default ResetPassword