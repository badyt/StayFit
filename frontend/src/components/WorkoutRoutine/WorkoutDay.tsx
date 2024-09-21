// Day.tsx
import React from "react";

interface DayProps {
  title: string;
  exercises: RoutineExercise[] | null;
  onExerciseClick: (exercise: RoutineExercise) => void;
}

const WorkoutDay: React.FC<DayProps> = ({ title, exercises, onExerciseClick }) => {
  return (
    <div className="day-container">
      <h2 className="day-title">{title}</h2>
      {(exercises?.length ?? null) ? <ul className="exercise-list">
        {exercises?.map((exerciseRow, index) => (
          <li key={index} className="exercise-item">
            <button
              className="exercise-button"
              onClick={() => onExerciseClick(exerciseRow)}
            >
              <div className="exercise-content">
                <span className="exercise-name">{index + 1}. {exerciseRow.name}</span>
                <div className="exercise-details">
                  <span className="exercise-sets">Sets: {exerciseRow.sets}</span>
                  <span className="exercise-reps">Reps: {exerciseRow.reps}</span>
                  <span className="exercise-weight">Weight: {exerciseRow.weight}kg</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul> : <p>Rest Day</p>}
    </div>
  );
};

export default WorkoutDay;
