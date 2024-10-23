import { create } from 'zustand';
import config from '../../config';
import { toast } from 'react-toastify';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface WorkoutHistoryStore {
    workoutHistory: WorkoutHistory | null;
    setWorkoutHistory: (data: WorkoutHistory | null) => void;
    fetchWorkoutHistory: (userId: User["userId"] | undefined) => void;
    reset: () => void;
}

const useWorkoutHistoryStore = create<WorkoutHistoryStore>((set) => ({
    workoutHistory: null,
    setWorkoutHistory: (data) => set({ workoutHistory: data }),
    fetchWorkoutHistory: async (userId) => {
        try {
            const response = await (await fetch(`${url}/getWorkoutHistory?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json();
            (response.error) ?
                toast.error(response.error)
                :
                useWorkoutHistoryStore.getState().setWorkoutHistory(response.data);
        } catch (error) {
            console.error('Error fetching workout history data:', error);
        }
    },
    reset: () => set({ workoutHistory: null })
}));

export default useWorkoutHistoryStore;
