'use client'

import { useEffect, useState } from "react"
import CreateAssistantModal from "../modals/CreateAssistantModal"
import DeleteMessageModal from "../modals/DeleteMessageModal"
import LinkAssistantModal from "../modals/LinkAssistantModal"
import ProModal from "../modals/ProModal"
import DeleteAssistantModal from "../modals/DeleteAssistantModal"
import ManageSubscriptionModal from "../modals/ManageSubscriptionModal"
import ActivateAccountModal from "../modals/ActivateAccountModal"


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
          <LinkAssistantModal/>
          <ProModal/>
          <DeleteAssistantModal/>
          <ManageSubscriptionModal/>
          <ActivateAccountModal/>
        </>
    )
}