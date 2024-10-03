
import React, { useEffect } from "react";
import DietDay from "./DietDay";
import { Typography } from "@mui/material";
import "../../styles/Plan.css";
import { useState } from "react";
import useLoginStore from "../../stores/loginstore";
import useDietPlanStore from "../../stores/dietplanstore";
import DietMealModal from "../Modals/FoodModals/DietMealModal";

const DietPlanPage: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { dietPlan, fetchDietPlan } = useDietPlanStore();
  const { user } = useLoginStore();
  const handleExerciseClick = (meal: Meal, day: string) => {
    setSelectedMeal(meal);
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
    setSelectedDay(null);
  };

  useEffect(() => {
    if (dietPlan?.length === 0) {
      fetchDietPlan(user?.userId);
    }
  }, []);


  return (
    <>
      <Typography fontSize={"28px"} fontFamily={"Garamond"} fontWeight={"bold"} marginTop={"0.2rem"}>
        Diet Plan
      </Typography>
      <div className="plan-page">
        {dietPlan?.map((day, index) => (
          <DietDay key={index} day={day.day} meals={day.meals} onMealClick={handleExerciseClick} />
        ))}
        {selectedMeal && (
          <DietMealModal
            meal={selectedMeal}
            day={selectedDay}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default DietPlanPage;
