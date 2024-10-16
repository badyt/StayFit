
import React, { useEffect } from "react";
import DietDay from "./DietDay";
import "../../styles/Plan.css";
import { useState } from "react";
import useLoginStore from "../../stores/loginstore";
import useDietPlanStore from "../../stores/dietplanstore";
import DietMealModal from "../Modals/FoodModals/DietMealModal";
import PageTabs from "../PageTabs";
import TodaysDiet from "./TodaysDiet";
import DietHistory from "./DietHistory";

const DietPlanPage: React.FC = () => {
  const tabs = ["Diet Plan", "Today's Diet","History"];
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTab, setTab] = useState<string>(tabs[0]);
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
  }, [dietPlan, user?.userId]); 

  const renderContent = () => {
    switch (selectedTab) {
      case tabs[0]: // Diet Plan
        return (
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
        );
      case tabs[1]: // Today's Diet
        return <TodaysDiet />;
      case tabs[2]: // History
        return <DietHistory/>; 
      default:
        return null;
    }
  };

  return (
    <>
      <PageTabs selectedTab={selectedTab} setTab={setTab} tabValues={tabs}></PageTabs>
      {renderContent()}
    </>
  );
};

export default DietPlanPage;
