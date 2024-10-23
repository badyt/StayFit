import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import "../../styles/TodaysPlan.css";
import config from "../../../config";
import useLoginStore from "../../stores/loginstore";
import { toast } from "react-toastify";
import useRoutineStore from "../../stores/routinestore";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

const TodaysWorkout: React.FC = () => {
    const { workoutRoutine } = useRoutineStore();
    const [todaysExercises, setTodayExercises] = useState<RoutineExercise[] | null>(null);
    const [workoutCompleted, setWorkoutCompleted] = useState(false);
    const { user } = useLoginStore();
    // Get today's date and day
    const today = new Date();
    const todayDate = today.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    const todayDay = today.toLocaleDateString(undefined, { weekday: "long" });

    function getScalingFactor(weight: number): number {
        if (weight < 40) return 0.5;
        else if (weight < 100) return 0.3;
        else return 0.2;
    }

    function calculateCaloriesPerSet(baseCalories: number, weight: number): number {
        const a = getScalingFactor(weight);
        return baseCalories * (1 + a * Math.log(weight / 10 + 1));
    }

    const totalCalories = useMemo(() => {
        let total = 0;
        todaysExercises?.forEach(exercise => {
            total += calculateCaloriesPerSet(exercise.calories_burnt_per_set, exercise.weight) * exercise.sets;
        });
        return Math.round(total);
    }, [todaysExercises]);

    useEffect(() => {
        const todayPlan = workoutRoutine?.find(day => day.day === todayDay);
        setTodayExercises(todayPlan?.exercises || null);

        const checkIfCompleted = async () => {
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(today.getDate()).padStart(2, '0');
            try {
                const response = await (await fetch(`${url}/getWorkoutHistoryForDay?userId=${user?.userId}&year=${year}&month=${month}&day=${day}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })).json();
                if (response.data) {
                    setWorkoutCompleted(true);
                } else if (response.error) {
                    toast.error(`${response.error}`)
                }
            } catch (error) {
                toast.error(`Error checking workout completion`);
            }
        };

        checkIfCompleted();
    }, [workoutRoutine, todayDay]);

    const handleConfirmCompletion = async () => {
        try {
            const response = await fetch(`${url}/completeWorkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.userId,
                    totalCalories: totalCalories,
                    date: today,
                    minutesOffset: today.getTimezoneOffset()
                })
            });
            const data = await response.json();
            if (data.error) {
                toast.error(`${data.error}`)
            }
            setWorkoutCompleted(data);
        } catch (error) {
            toast.error('Error completing workout.');
        }
    };


    return (
        <div className="todays-container">
            <Typography variant="h5" className="date-title">{todayDate}</Typography>
            <Typography variant="h6" className="day-title">{todayDay}'s Diet</Typography>

            {todaysExercises && todaysExercises.length > 0 ? (
                <ul className="todays-list">
                    {todaysExercises.map((exercise, index) => (
                        <li key={index} className="todays-item">
                            <span className="todays-item-name">{index + 1}. {exercise.name}</span>
                            <div className="todays-item-details">
                                <span>Sets: {exercise.sets}</span>
                                <span>Reps: {exercise.reps}</span>
                                <span>Weight: {exercise.weight}</span>
                            </div>
                        </li>
                    ))}
                    <li>
                        <div className="total-values">
                            <span>Total Calories: {totalCalories}  </span>
                        </div>
                    </li>
                </ul>
            ) : (
                <Typography variant="body1" style={{ marginTop: "1rem" }}>No Workout planned for today.</Typography>
            )}

            {todaysExercises && todaysExercises.length > 0 && <Button
                variant="outlined"
                color="success"
                onClick={handleConfirmCompletion}
                disabled={workoutCompleted}
                className="confirm-button"
            >
                {workoutCompleted ? "Workout Completed" : "Complete"}
            </Button>}
        </div>
    );
};

export default TodaysWorkout;
