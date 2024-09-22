import { create } from 'zustand';

interface ExercisesStore {
    exercisesData: ExerciseCategory[] | null;
    setExercisesData: (data: ExerciseCategory[] | null) => void;
    reset: () => void;
}

const useExercisesStore = create<ExercisesStore>((set) => ({
    exercisesData: null,
    setExercisesData: (data) => set({ exercisesData: data }),
    reset: () => set({ exercisesData: null })
}));

export default useExercisesStore;
