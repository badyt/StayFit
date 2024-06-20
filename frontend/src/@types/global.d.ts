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
        accessToken: string | null;
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

    export interface Exercise {
        id: number;
        name: string;
        image: string;
    }

    export interface ExerciseCategory {
        id: number;
        name: string;
        exercises: Exercise[];
    }

}
export { }

