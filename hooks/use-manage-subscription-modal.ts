import { create } from "zustand";

interface ManageSubscriptionModalData {
    isPro?: boolean
}

type ManageSubscriptionModalStore = {
    isOpen: boolean
    onOpen: (data?: ManageSubscriptionModalData) => void
    onClose: () => void
    data: ManageSubscriptionModalData
}

export const useManageSubscriptionModal = create<ManageSubscriptionModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false })
}))