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
        userId: string;
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

    export interface Exercise {
        id: number;
        name: string;
        image: string;
        description: string;
    }

    export interface ExerciseCategory {
        id: number;
        name: string;
        exercises: Exercise[];
    }

}
export { }

