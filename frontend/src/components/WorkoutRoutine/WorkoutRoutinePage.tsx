
import React, { useEffect } from "react";
import WorkoutDay from "./WorkoutDay";
import { Typography } from "@mui/material";
import "./WorkoutRoutine.css"
import { useState } from "react";
import RoutineExerciseModal from "../Modals/RoutineExcerciseModal";
import useRoutineStore from "../../stores/routinestore";
import config from "../../../config";
import useLoginStore from "../../stores/loginstore";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
const workoutData = [
  {
    title: "Monday",
    exercises: [
      {
        exercise: {
          id: 1,
          name: "Squat",
          image: "squat.jpg",
          calories_burnt_per_set: 8,
          description: "cool exercise to be done every day of the week"
        },
        reps: 12,
        weight: 50,
        sets: 4
      },
      {
        exercise: {
          id: 1,
          name: "Bench Press",
          image: "bench-press.jpg",
          calories_burnt_per_set: 7,
          description: "cool exercise to be done every day of the week"
        }, reps: 15, weight: 0, sets: 3
      },
    ],
  },
  {
    title: "Tuesday",
    exercises: [
      {
        exercise: {
          id: 1,
          name: "Bench Press",
          image: "bench-press.jpg",
          calories_burnt_per_set: 7,
          description: "cool exercise to be done every day of the week"
        }, reps: 15, weight: 0, sets: 3
      },
    ],
  },
  {
    title: "Wednesday",
    exercises: [
      {
        exercise: {
          id: 1,
          name: "Bench Press",
          image: "bench-press.jpg",
          calories_burnt_per_set: 7,
          description: "cool exercise to be done every day of the week"
        },
        reps: 8,
        weight: 120,
        sets: 4
      },
    ],
  },
  {
    title: "Thursday",
    exercises: [
      {
        exercise: {
          id: 1,
          name: "Bench Press",
          image: "bench-press.jpg",
          calories_burnt_per_set: 7,
          description: "cool exercise to be done every day of the week"
        }, reps: 15, weight: 50, sets: 3
      },
    ],
  },
  {
    title: "Friday",
    exercises: [
      {
        exercise: {
          id: 1,
          name: "Squat",
          image: "squat.jpg",
          calories_burnt_per_set: 8,
          description: "cool exercise to be done every day of the week"
        }, reps: 12, weight: 30, sets: 4
      },
    ],
  },
  {
    title: "Saturday",
    exercises: [],
  },
  {
    title: "Sunday",
    exercises: [],
  },
];


const WorkoutRoutinePage: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { workoutRoutine, fetchRoutineData } = useRoutineStore();
  const { user } = useLoginStore()
  const handleExerciseClick = (exercise: RoutineExercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };

  useEffect(() => {
    if (workoutRoutine?.length === 0) {
      fetchRoutineData(user?.userId);
    }
    console.log(workoutRoutine);
  }, []);


  return (
    <>
      <Typography fontSize={"22px"} fontFamily={"Garamond"} fontWeight={"bold"} marginTop={"0.2rem"}>
        Workout Routine
      </Typography>
      <div className="workout-routine-page">
        {workoutRoutine?.map((day, index) => (
          <WorkoutDay key={index} title={day.day} exercises={day.exercises} onExerciseClick={handleExerciseClick} />
        ))}
        {selectedExercise && (
          <RoutineExerciseModal
            title={selectedExercise.name}
            image={selectedExercise.image}
            description={selectedExercise.description}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default WorkoutRoutinePage;
