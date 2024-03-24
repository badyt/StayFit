import { create } from 'zustand';

interface FoodData {
  name: string;
  calories_per_100g: number;
  protein_per_100g: number;
}


interface FoodStore {
  foodData: FoodData[] | null;
  setFoodData: (data: FoodData[] | null) => void;
}

const useFoodStore = create<FoodStore>((set) => ({
  foodData: null,
  setFoodData: (data) => set({ foodData: data }),
}));

export default useFoodStore;
