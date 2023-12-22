'use client'

import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
    isPro: boolean;
  };

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {

    const proModal = useProModal();

    // const { execute, isLoading } = useAction(stripeRedirect, {
    //     onSuccess: (data) => {
    //       window.location.href = data;
    //     },
    //     onError: (error) => {
    //       toast.error(error);
    //     }
    //   });
    
      const onClick = () => {
        if (isPro) {
        //   execute({});
        } else {
          proModal.onOpen();
        }
      }

  return (
    <Button onClick={onClick} size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2" variant="purple">
        {isPro ? "Manage Subscription" : "Upgrade To Pro"}
    </Button>
  )
}

export default SubscriptionButton