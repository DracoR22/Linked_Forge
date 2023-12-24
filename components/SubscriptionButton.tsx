'use client'

import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "./ui/button";
import { CreditCard, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { LoaderButton } from "./ui/loader-button";

interface SubscriptionButtonProps {
    isPro?: boolean;
  };

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {

    const proModal = useProModal();

    const [isLoading, setIsLoading] = useState(false)
    
      const onClick = async () => {
        if (isPro) {
          setIsLoading(true);
          const response = await axios.get("/api/stripe");
  
          window.location.href = response.data.url;

          setIsLoading(false)
        } else {
          proModal.onOpen();
        }
      }

  return (
    <LoaderButton isLoading={isLoading} onClick={onClick} size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2 outline-indigo-500" variant="purple">
        {isPro ? (
           <>
          Manage Subscription
           </>  
        ) : (
          <div className="flex items-center gap-x-2">
            <Sparkles className="h-5 w-5"/>
            Upgrade To Pro
          </div>
        )}
    </LoaderButton>
  )
}

export default SubscriptionButton