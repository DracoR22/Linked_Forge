import { create } from 'zustand'

interface DeleteMessageModalData {
    messageId?: any
}

interface DeleteMessageModalStore {
    isOpen: boolean
    onOpen: (data?: DeleteMessageModalData) => void
    onClose: () => void
    data: DeleteMessageModalData
}

const useDeleteMessageModal = create<DeleteMessageModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useDeleteMessageModal