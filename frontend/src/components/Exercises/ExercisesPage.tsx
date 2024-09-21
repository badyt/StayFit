import { Typography } from "@mui/material";
import './Exercises.css';
import ExerciseCategory from './ExerciseCategory';
import { useEffect, useState } from "react";
import config from '../../../config';
import useExercisesStore from "../../stores/exercisesstore";
import ExerciseModal from "../Modals/ExerciseModal";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

export default function ExercisesPage() {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const { exercisesData, setExercisesData } = useExercisesStore();

    const handleExerciseClick = (exercise: Exercise) => {
        setSelectedExercise(exercise);
    };
    const handleCloseModal = () => {
        setSelectedExercise(null);
    };

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
            console.error('Error fetching exercises data:', error);
        }
    };

    useEffect(() => {
        if (!exercisesData) {
            fetchExercisesData();
        }
    }, []);

    return (
        <>
            <Typography fontSize={"22px"} fontFamily={"Garamond"} fontWeight={"bold"} marginTop={"0.2rem"}>
                Exercises
            </Typography>
            <div style={{ marginRight: "auto" }}>
                {exercisesData?.map((category) => (
                    <ExerciseCategory key={category.id} category={category} onExerciseClick={handleExerciseClick} />
                ))}
            </div>
            {selectedExercise && (
                <ExerciseModal
                    exercise={selectedExercise}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}