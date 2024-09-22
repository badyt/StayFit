// utils/storeReset.ts
import useRoutineStore from './routinestore';
import useFoodStore from './foodstore';
import useExercisesStore from './exercisesstore';
import useSideDrawerStore from './sidedrawerstore';

export const resetAllStores = () => {
    useRoutineStore.getState().reset();
    useFoodStore.getState().reset();
    useExercisesStore.getState().reset();
    useSideDrawerStore.getState().reset();
};