// Day.tsx
import React from "react";

interface ExerciseRow {
  exercise: Exercise;
  reps: number;
  weight: number;
  sets: number;
}

interface DayProps {
  title: string;
  exercises: ExerciseRow[] | null;
  onExerciseClick: (exercise: Exercise) => void;
}

const WorkoutDay: React.FC<DayProps> = ({ title, exercises, onExerciseClick  }) => {
  return (
    <div className="day-container">
      <h2 className="day-title">{title}</h2>
      {(exercises?.length ?? null) ? <ul className="exercise-list">
        {exercises?.map((exerciseRow, index) => (
          <li key={index} className="exercise-item">
            <button
              className="exercise-button"
              onClick={() => onExerciseClick(exerciseRow.exercise)}
            >
              {index+1}. Exercise: {exerciseRow.exercise.name}, Reps: {exerciseRow.reps}, Weight: {exerciseRow.weight}kg, Sets: {exerciseRow.sets}
            </button>
          </li>
        ))}
      </ul> : <p>Rest Day</p>}
    </div>
  );
};

export default WorkoutDay;
