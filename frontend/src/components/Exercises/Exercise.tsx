import React from 'react';
interface ExerciseProps {
  exercise: Exercise;
  onExerciseClick: (exercise: Exercise) => void;
}
const imagesUrl = '../../../images/Exercises';
const Exercise: React.FC<ExerciseProps> = ({ exercise, onExerciseClick }) => {
  return (
    <div className="exercise"    onClick={() => onExerciseClick(exercise)}>
      <img src={`${imagesUrl}/${exercise.image}`} alt={exercise.name} />
      <p>{exercise.name}</p>
    </div>
  );
};

export default Exercise;



