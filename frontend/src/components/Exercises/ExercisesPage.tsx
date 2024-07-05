import { Typography } from "@mui/material";
import './Exercises.css';
import ExerciseCategory from './ExerciseCategory';


const categories: ExerciseCategory[] = [
    {
        id: 1,
        name: 'Shoulder Exercises',
        exercises: [
            { id: 1, name: 'Shoulder Press', image: 'shoulder-press.jpg' },
            { id: 2, name: 'Lateral Raise', image: 'lateral-raises.jpg' },
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
    return (
        <>
            <Typography fontSize={"22px"} fontFamily={"impact"} fontWeight={"bold"} marginTop={"0.2rem"}>
                Exercises
            </Typography>
            <div style={{ marginRight: "auto" }}>
                {categories.map((category) => (
                    <ExerciseCategory key={category.id} category={category} />
                ))}
            </div>

        </>
    );
}