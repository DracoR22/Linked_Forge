import { create } from "zustand";

type CreateAssistantStore = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useCreateAssistantModal = create<CreateAssistantStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))