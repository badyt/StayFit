// utils/storeReset.ts
import useRoutineStore from './routinestore';
import useFoodStore from './foodstore';
import useExercisesStore from './exercisesstore';
import useSideDrawerStore from './sidedrawerstore';
import useDietPlanStore from './dietplanstore';
import UseDietHistoryStore from './diethistorystore';

export const resetAllStores = () => {
    useRoutineStore.getState().reset();
    useFoodStore.getState().reset();
    useExercisesStore.getState().reset();
    useSideDrawerStore.getState().reset();
    useDietPlanStore.getState().reset();
    UseDietHistoryStore.getState().reset();
};