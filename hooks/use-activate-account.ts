import { create } from 'zustand'

interface ActivateAccountModalData {
    activationToken?: any
}

interface ActivateAccountModalStore {
    isOpen: boolean
    onOpen: (data?: ActivateAccountModalData) => void
    onClose: () => void
    data:ActivateAccountModalData
}

const useActivateAccountModal = create<ActivateAccountModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useActivateAccountModal
