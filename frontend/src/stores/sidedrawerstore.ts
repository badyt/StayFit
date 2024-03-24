import { create } from 'zustand';

// Define the type of state
interface SideDrawerStore {
    pickedContent: string;
    setContent: (loading: string) => void
}

const useSideDrawerStore = create<SideDrawerStore>((set) => ({
    pickedContent: "",
    setContent: newContent => set(() => ({ pickedContent: newContent }))
}));

export default useSideDrawerStore;