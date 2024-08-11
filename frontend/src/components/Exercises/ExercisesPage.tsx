import { Typography } from "@mui/material";
import './Exercises.css';
import ExerciseCategory from './ExerciseCategory';
import { useEffect } from "react";
import config from '../../../config';
import useExercisesStore from "../../stores/exercisesstore";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

export default function ExercisesPage() {
    const { exercisesData, setExercisesData } = useExercisesStore();
    const fetchExercisesData = async () => {
        try {
            const response = await fetch(`${url}/getAllExercises`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setExercisesData(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    useEffect(() => {
        if (!exercisesData) {
            fetchExercisesData();
        }
    }, []);

    return (
        <>
            <Typography fontSize={"22px"} fontFamily={"impact"} fontWeight={"bold"} marginTop={"0.2rem"}>
                Exercises
            </Typography>
            <div style={{ marginRight: "auto" }}>
                {exercisesData?.map((category) => (
                    <ExerciseCategory key={category.id} category={category} />
                ))}
            </div>

        </>
    );
}