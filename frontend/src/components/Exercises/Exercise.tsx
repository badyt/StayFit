import React from 'react';
interface ExerciseProps {
  exercise: Exercise;
}
const imagesUrl = '../../../images/Exercises';
const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  return (
    <div className="exercise">
      <img src={`${imagesUrl}/${exercise.image}`} alt={exercise.name} />
      <p>{exercise.name}</p>
    </div>
  );
};

export default Exercise;



