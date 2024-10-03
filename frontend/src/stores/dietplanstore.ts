import { create } from 'zustand';
import config from '../../config';
import { toast } from 'react-toastify';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface DietPlanStore {
    dietPlan: DietDay[] | null;
    setDietPlan: (data: DietDay[] | null) => void;
    fetchDietPlan: (userId: User["userId"] | undefined) => void;
    reset: () => void;
}

const useDietPlanStore = create<DietPlanStore>((set) => ({
    dietPlan: [],
    setDietPlan: (data) => set({ dietPlan: data }),
    fetchDietPlan: async (userId) => {
        try {
            const response = await (await fetch(`${url}/getUserDiet?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json();
            (response.error) ?
                toast.error(response.error)
                :
                useDietPlanStore.getState().setDietPlan(response.data.days);
        } catch (error) {
            console.error('Error fetching diet plan data:', error);
        }
    },
    reset: () => set({ dietPlan: [] })
}));

export default useDietPlanStore;
