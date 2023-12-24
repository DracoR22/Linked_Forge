import { create } from 'zustand'

interface DeleteAssistantModalData {
    assistantId?: any
    assistantName?: string
}

interface DeleteAssistantModalStore {
    isOpen: boolean
    onOpen: (data?: DeleteAssistantModalData) => void
    onClose: () => void
    data: DeleteAssistantModalData
}

const useDeleteAssistantModal = create<DeleteAssistantModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useDeleteAssistantModal