import { Navigate } from "react-router-dom";
import useLoginStore from '../../stores/loginstore';
import React from "react";
import FoodComponent from '../Food';
import Exercises from "../Exercises";
import useSideDrawerStore from "../../stores/sidedrawerstore";
import WorkoutRoutinePage from "../WorkoutRoutine"
const Content = () => {
    const { user } = useLoginStore();
    const { pickedDrawerTab } = useSideDrawerStore();
    if (!user?.accessToken)
        return <Navigate to="/login" />;
    
    
    const getPickedContentComponent = (pickedDrawerTab: DrawerTab | null): React.ReactNode => {
        switch (pickedDrawerTab?.text) {
            case "Food":
                return <FoodComponent/>
            case "Diet Plan":
                return <div>Diet Plan</div>
            case "Diet History":
                return <div>Diet History</div>
            case "Workout Routine":
                return <WorkoutRoutinePage/>
            case "Workout History":
                return <div>Workout History</div>
            case "Weight Measurements":
                return <div>Weight Measurements</div>
            case "Workout Plans":
                return <div>Workout Plans</div>
            case "Workout Exercises":
                return <Exercises/>
            default:
                return <div>
                    This is the content.
                </div>;
        }
    }
    return (<>
        {getPickedContentComponent(pickedDrawerTab)}
    </>

    );
}

export default Content;