'use client'

import axios from "axios"
import { useParams } from "next/navigation"
import { useState } from "react"

const Custom = () => {

  const [instructions, setInstructions] = useState('')
  const params = useParams()

  const onSubmit = async () => {
    try {
        await axios.patch(`/api/assistant/${params.assistantId}`, { instructions })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <textarea id="instructions" name="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
      <button className="max-w-sm" onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default Custom