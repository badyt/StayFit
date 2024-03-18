import { create } from 'zustand';

// Define the type of state
interface LoadingStore {
    loading: Boolean;
    setLoading: (loading: Boolean) => void
}

const useLoadingStore = create<LoadingStore>((set) => ({
    loading: true,
    setLoading: newState => set(() => ({ loading: newState }))
}));

export default useLoadingStore;