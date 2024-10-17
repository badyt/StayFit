import { create } from 'zustand';
import config from '../../config';
import { toast } from 'react-toastify';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface WeightHistoryStore {
    weightHistory: WeightHistory | null;
    setWeightHistory: (data: WeightHistory | null) => void;
    fetchWeightHistory: (userId: User["userId"] | undefined) => void;
    reset: () => void;
}

const useWeightHistoryStore = create<WeightHistoryStore>((set) => ({
    weightHistory: null,
    setWeightHistory: (data) => set({ weightHistory: data }),
    fetchWeightHistory: async (userId) => {
        try {
            const response = await (await fetch(`${url}/getWeightHistory?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json();
            (response.error) ?
                toast.error(response.error)
                :
                useWeightHistoryStore.getState().setWeightHistory(response.data);
        } catch (error) {
            console.error('Error fetching diet history data:', error);
        }
    },
    reset: () => set({ weightHistory: null })
}));

export default useWeightHistoryStore;
