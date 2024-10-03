// Day.tsx
import React from "react";

interface DayProps {
  day: string;
  exercises: RoutineExercise[] | null;
  onExerciseClick: (exercise: RoutineExercise, day: string) => void;
}

const WorkoutDay: React.FC<DayProps> = ({ day, exercises, onExerciseClick }) => {
  return (
    <div className="day-container">
      <h2 className="day-title">{day}</h2>
      {(exercises?.length ?? null) ? <ul className="item-list">
        {exercises?.map((exerciseRow, index) => (
          <li key={index} className="item">
            <button
              className="item-button"
              onClick={() => onExerciseClick(exerciseRow, day)}
            >
              <div className="item-content">
                <span className="item-name">{index + 1}. {exerciseRow.name}</span>
                <div className="item-details">
                  <span className="item-child">Sets: {exerciseRow.sets}</span>
                  <span className="item-child">Reps: {exerciseRow.reps}</span>
                  <span className="item-child">Weight: {exerciseRow.weight}kg</span>
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
