'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "../ui/input"
import axios from "axios"

const Activation = () => {

    const params = useParams() 

    const [code, setCode] = useState("")

    const onSubmit = async (e: any) => {
        e.preventDefault();
       try {
        await axios.post("/api/email-confirm", {activation_token: params.activationToken, activation_code: code})
       } catch (error) {
        console.log(error)
       }
    }

  return (
    <div>
        <form onSubmit={onSubmit} className="mt-10">
        <Input id="code" name="code" onChange={(e) => setCode(e.target.value)}/>
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Activation