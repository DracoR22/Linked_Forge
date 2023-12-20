import { create } from 'zustand'

interface LinkAssistantModalData {
    assistantId?: any
}

interface LinkAssistantModalStore {
    isOpen: boolean
    onOpen: (data?: LinkAssistantModalData) => void
    onClose: () => void
    data: LinkAssistantModalData
}

const useLinkAssistantModal = create<LinkAssistantModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useLinkAssistantModal