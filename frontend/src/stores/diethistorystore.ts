import { create } from 'zustand';
import config from '../../config';
import { toast } from 'react-toastify';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface DietHistoryStore {
    dietHistory: DietHistory | null;
    setDietHistory: (data: DietHistory | null) => void;
    fetchDietHistory: (userId: User["userId"] | undefined) => void;
    reset: () => void;
}

const useDietHistoryStore = create<DietHistoryStore>((set) => ({
    dietHistory: null,
    setDietHistory: (data) => set({ dietHistory: data }),
    fetchDietHistory: async (userId) => {
        try {
            const response = await (await fetch(`${url}/getDietHistory?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json();
            (response.error) ?
                toast.error(response.error)
                :
                useDietHistoryStore.getState().setDietHistory(response.data);
        } catch (error) {
            console.error('Error fetching diet history data:', error);
        }
    },
    reset: () => set({ dietHistory: null })
}));

export default useDietHistoryStore;
