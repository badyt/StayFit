import { Navigate } from "react-router-dom";
import useLoginStore from '../../stores/loginstore';
import React from "react";
import FoodComponent from '../Food';
import Exercises from "../Exercises";
import useSideDrawerStore from "../../stores/sidedrawerstore";
import WorkoutRoutinePage from "../WorkoutRoutine"
import DietPlanPage from "../DietPlan/DietPlanPage";
import WeightMeasurements from "../WeightMeasurements";
import Calculator from "../Calculator";
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
                return <DietPlanPage/>
            case "Workout Routine":
                return <WorkoutRoutinePage/>
            case "Weight Measurements":
                return <WeightMeasurements/>
            case "Workout Plans":
                return <div>Workout Plans</div>
            case "Workout Exercises":
                return <Exercises/>
            case "Calculator":
                return <Calculator/>
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