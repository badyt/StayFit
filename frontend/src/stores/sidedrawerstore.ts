import { create } from 'zustand';

// Define the type of state
interface SideDrawerStore {
    pickedDrawerTab: DrawerTab | null;
    setDrawerTab : (value: DrawerTab) => void;
}

const useSideDrawerStore = create<SideDrawerStore>((set) => ({
    pickedDrawerTab: null,
    setDrawerTab: newDrawerTab => set(() => ({pickedDrawerTab: newDrawerTab})),
}));

export default useSideDrawerStore;