import { create } from 'zustand';

interface FoodStore {
  foodData: FoodData[] | null;
  setFoodData: (data: FoodData[] | null) => void;
  reset: () => void;
}

const useFoodStore = create<FoodStore>((set) => ({
  foodData: null,
  setFoodData: (data) => set({ foodData: data }),
  reset: () => set({ foodData: null })
}));

export default useFoodStore;
