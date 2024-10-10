import React from "react";
import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import useDietPlanStore from "../../stores/dietplanstore";
import "./TodaysDiet.css";
import config from "../../../config";
import useLoginStore from "../../stores/loginstore";
import { toast } from "react-toastify";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

const TodaysDiet: React.FC = () => {
    const { dietPlan } = useDietPlanStore();
    const [todayMeals, setTodayMeals] = useState<Meal[] | null>(null);
    const [dietCompleted, setDietCompleted] = useState(false);
    const { user } = useLoginStore();
    // Get today's date and day
    const today = new Date();
    const todayDate = today.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    const todayDay = today.toLocaleDateString(undefined, { weekday: "long" });
    const calculateTotal = (nutritionType: string) => {
        let total = 0;
        (nutritionType === "calories") ?
            todayMeals?.forEach(meal => {
                total += meal.totalCalories;
            }) : todayMeals?.forEach(meal => {
                total += meal.totalProtien;
            })
        return total;
    }
    useEffect(() => {
        const todayPlan = dietPlan?.find(day => day.day === todayDay);
        setTodayMeals(todayPlan?.meals || null);

        const checkIfCompleted = async () => {
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(today.getDate()).padStart(2, '0');
            try {
                const response = await (await fetch(`${url}/getDietHistoryForDay?userId=${user?.userId}&year=${year}&month=${month}&day=${day}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })).json();
                if (response.data) {
                    setDietCompleted(true);
                }else if(response.error) {
                    toast.error(`${response.error}`)
                }
            } catch (error) {
                toast.error(`Error checking diet completion`);
            }
        };

        checkIfCompleted();
    }, [dietPlan, todayDay]);

    const handleConfirmCompletion = async () => {
        try {
            const response = await fetch(`${url}/completeDiet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.userId,
                    totalCalories: calculateTotal("calories"),
                    totalProteins: calculateTotal("protien"),
                    date: today
                })
            });
            const data = await response.json();
            if(data.error) {
                toast.error(`${data.error}`)
            }
            setDietCompleted(data);
        } catch (error) {
            toast.error('Error completing diet');
        }
    };


    return (
        <div className="todays-diet-container">
            <Typography variant="h5" className="date-title">{todayDate}</Typography>
            <Typography variant="h6" className="day-title">{todayDay}'s Diet</Typography>

            {todayMeals && todayMeals.length > 0 ? (
                <ul className="meal-list">
                    {todayMeals.map((meal, index) => (
                        <li key={index} className="meal-item">
                            <span className="meal-name">{index + 1}. {meal.food.name}</span>
                            <div className="meal-details">
                                <span>Time: {meal.time}</span>
                                <span>Grams: {meal.grams}</span>
                            </div>
                        </li>
                    ))}
                    <li>
                        <div className="total-values">
                            <span>Total Calories: {calculateTotal("calories")}  </span>
                            <span>  Total Protien: {calculateTotal("protien")}</span>
                        </div>
                    </li>
                </ul>
            ) : (
                <Typography variant="body1" className="no-meals-text">No meals planned for today.</Typography>
            )}

            {todayMeals && todayMeals.length > 0 && <Button
                variant="outlined"
                color="success"
                onClick={handleConfirmCompletion}
                disabled={dietCompleted}
                className="confirm-button"
            >
                {dietCompleted ? "Diet Completed" : "Complete"}
            </Button>}
        </div>
    );
};

export default TodaysDiet;
