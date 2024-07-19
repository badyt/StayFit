import { create } from 'zustand';

interface ExercisesStore {
    exercisesData: ExerciseCategory[] | null;
    setExercisesData: (data: ExerciseCategory[] | null) => void;
}

const useExercisesStore = create<ExercisesStore>((set) => ({
    exercisesData: null,
    setExercisesData: (data) => set({ exercisesData: data }),
}));

export default useExercisesStore;
