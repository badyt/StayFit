import { create } from 'zustand';
import config from '../../config';
import { toast } from 'react-toastify';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface RoutineStore {
    workoutRoutine: RoutineDay[] | null;
    setWorkoutRoutine: (data: RoutineDay[] | null) => void;
    fetchRoutineData: (userId: User["userId"] | undefined) => void;
    reset: () => void;
}

const useRoutineStore = create<RoutineStore>((set) => ({
    workoutRoutine: [],
    setWorkoutRoutine: (data) => set({ workoutRoutine: data }),
    fetchRoutineData: async (userId) => {
        try {
            const response = await (await fetch(`${url}/getUserRoutine?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json();
            (response.error) ?
                toast.error(response.error)
                :
                useRoutineStore.getState().setWorkoutRoutine(response.data.days);
        } catch (error) {
            console.error('Error fetching routine data:', error);
        }
    },
    reset: () => set({ workoutRoutine: [] })
}));

export default useRoutineStore;
