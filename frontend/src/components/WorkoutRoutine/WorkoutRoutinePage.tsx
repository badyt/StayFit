
import React, { useEffect } from "react";
import WorkoutDay from "./WorkoutDay";
import { Typography } from "@mui/material";
import "../../styles/Plan.css";
import { useState } from "react";
import RoutineExerciseModal from "../Modals/ExercisesModals/RoutineExcerciseModal";
import useRoutineStore from "../../stores/routinestore";
import useLoginStore from "../../stores/loginstore";


const WorkoutRoutinePage: React.FC = () => {
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


  return (
    <>
      <Typography fontSize={"28px"} fontFamily={"Garamond"} fontWeight={"bold"} marginTop={"0.2rem"}>
        Workout Routine
      </Typography>
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
    </>
  );
};

export default WorkoutRoutinePage;
