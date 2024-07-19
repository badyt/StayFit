import { Typography } from "@mui/material";
import './Exercises.css';
import ExerciseCategory from './ExerciseCategory';
import { useEffect } from "react";
import config from '../../../config';
import useExercisesStore from "../../stores/exercisesstore";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

const categories: ExerciseCategory[] = [
    {
        id: 1,
        name: 'Shoulder Exercises',
        exercises: [
            { id: 1, name: 'Shoulder Press', image: 'shoulder-press.jpg' },
            { id: 2, name: 'Lateral Raise', image: 'lateral-raises.jpg' },
            { id: 3, name: 'Arnold Press', image: 'arnold-press.jpg' },
            { id: 4, name: 'Front Raises', image: 'front-raises.jpg' },
            { id: 5, name: 'Reverse Fly', image: 'reverse-fly.jpg' },
            { id: 6, name: 'Upright Row', image: 'upright-row.jpg' },
            { id: 7, name: 'Face Pull', image: 'face-pull.jpg' },
            { id: 8, name: 'Overhead Press', image: 'overhead-press.jpg' },
            { id: 9, name: 'Cable Lateral Raises', image: 'cable-lateral-raises.jpg' },
            { id: 10, name: 'Machine Shoulder Press', image: 'machine-shoulder-press.jpg' },
        ],
    },
    {
        id: 2,
        name: 'Leg Exercises',
        exercises: [
            { id: 3, name: 'Squat', image: 'squat.jpg' },
            { id: 4, name: 'Lunge', image: 'lunge.jpg' },
        ],
    },
];

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