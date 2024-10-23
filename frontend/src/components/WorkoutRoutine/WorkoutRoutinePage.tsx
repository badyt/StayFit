
import React, { useEffect } from "react";
import WorkoutDay from "./WorkoutDay";
import "../../styles/Plan.css";
import { useState } from "react";
import RoutineExerciseModal from "../Modals/ExercisesModals/RoutineExcerciseModal";
import useRoutineStore from "../../stores/routinestore";
import useLoginStore from "../../stores/loginstore";
import TodaysWorkout from "./TodaysWorkout";
import PageTabs from "../PageTabs";
import WorkoutHistory from "./WorkoutHistory";


const WorkoutRoutinePage: React.FC = () => {
  const tabs = ["Routine", "Today's Workout", "History"];
  const [selectedTab, setTab] = useState<string>(tabs[0]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { workoutRoutine, fetchRoutineData } = useRoutineStore();
  const { user } = useLoginStore()
  const handleExerciseClick = (exercise: RoutineExercise, day: string) => {
    setSelectedExercise(exercise);
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
    setSelectedDay(null);
  };

  useEffect(() => {
    if (workoutRoutine?.length === 0) {
      fetchRoutineData(user?.userId);
    }
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case tabs[0]: // Routine
        return (
          <div className="plan-page">
            {workoutRoutine?.map((day, index) => (
              <WorkoutDay key={index} day={day.day} exercises={day.exercises} onExerciseClick={handleExerciseClick} />
            ))}
            {selectedExercise && (
              <RoutineExerciseModal
                exercise={selectedExercise}
                day={selectedDay}
                onClose={handleCloseModal}
              />
            )}
          </div>
        );
      case tabs[1]: // Today's Workout
        return <TodaysWorkout />;
      case tabs[2]: // History
        return <WorkoutHistory />;
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

export default WorkoutRoutinePage;
