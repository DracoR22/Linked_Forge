'use client'

import { useEffect, useState } from "react"
import CreateAssistantModal from "../modals/CreateAssistantModal"


export const ModalProvider = () => {

   const[isMounted, setIsMounted] = useState(false)

   useEffect(() => {
    setIsMounted(true)
   }, [])

   if (!isMounted) {
    return null
   }

    return (
        <>
          <CreateAssistantModal/>
        </>
    )
}