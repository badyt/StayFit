declare global {
    interface TokenPayload {
        userId: string;
        exp: number;
    }

    interface LoginCredentials {
        email: string;
        password: string;
    }

    interface User {
        userId: string | null;
        accessToken: string | null;
    }

    interface DecodedToken {
        userId: string;
        iat: number;
        exp: number;
    }

    interface DrawerTab {
        text: string,
        icon: any,
        containSearch: boolean,
        containSelect: boolean,
        selectionItems: DropDownSelection | null
    }

    interface DropDownSelection {
        label: string,
        items: string[]
    }

    interface Exercise {
        id: number;
        name: string;
        image: string;
        calories_burnt_per_set: number;
        description: string;
    }

    interface RoutineExercise {
        id: number;
        name: string;
        image: string;
        calories_burnt_per_set: number;
        description: string;
        sets: number;
        reps: number;
        weight: number;
    }

    interface RoutineDay {
        day: string;
        exercises: RoutineExercise[];
    }

    interface ExerciseCategory {
        id: number;
        name: string;
        exercises: Exercise[];
    }

    interface FoodData {
        name: string;
        calories_per_100g: number;
        protein_per_100g: number;
    }

    interface Meal {
        food: FoodData;
        time: string;
        grams: number;
        totalCalories: number;
        totalProtien: number;
    }

    interface DietDay {
        day: string;
        meals: Meal[];
    }

    interface DietHistoryEntry {
        totalCalories: number;
        totalProteins: number;
      }
      
      interface MonthDietHistory {
        [day: string]: DietHistoryEntry; 
      }
      
      interface YearDietHistory {
        [month: string]: MonthDietHistory;
      }
      
      interface DietHistory {
        [year: string]: YearDietHistory;
      }
}
export { }

