'use client'

import { useEffect, useState } from "react"
import CreateAssistantModal from "../modals/CreateAssistantModal"
import DeleteMessageModal from "../modals/DeleteMessageModal"


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
          <DeleteMessageModal/>
        </>
    )
}