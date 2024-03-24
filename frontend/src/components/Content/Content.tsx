import { Navigate } from "react-router-dom";
import useLoginStore from '../../stores/loginstore';
import React from "react";
import FoodComponent from '../Food'
import useSideDrawerStore from "../../stores/sidedrawerstore";
const Content = () => {
    const { user } = useLoginStore();
    const { pickedContent } = useSideDrawerStore();
    if (!user?.accessToken)
        return <Navigate to="/login" />;
    
    
    const getPickedContentComponent = (pickedcontent: string): React.ReactNode => {
        switch (pickedcontent) {
            case "Food":
                return <FoodComponent/>
            case "Diet Plan":
                return <div>Diet Plan</div>
            case "Diet History":
                return <div>Diet History</div>
            case "Workout Routine":
                return <div>Workout Routine</div>
            case "Workout History":
                return <div>Workout History</div>
            case "Weight Measurements":
                return <div>Weight Measurements</div>
            case "Workout Plans":
                return <div>Workout Plans</div>
            case "Workout Exercises":
                return <div>Workout Exercises</div>
            default:
                return <div>
                    This is the content.
                </div>;
        }
    }
    return (<div>
        {getPickedContentComponent(pickedContent)}
    </div>

    );
}

export default Content;