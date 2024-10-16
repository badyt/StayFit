import React from 'react';
import Exercise from './Exercise';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Exercises.css';
interface CategoryProps {
    category: ExerciseCategory;
    onExerciseClick: (exercise: Exercise) => void;

}
const ExerciseCategory: React.FC<CategoryProps> = ({ category, onExerciseClick }) => {
    return (
        <>
            <div id="categoryContainer" className="exercise-container" >
                <div className='exercise-row'>
                    {category.exercises.map((exercise) => (
                        <Exercise key={exercise.id} exercise={exercise} onExerciseClick={onExerciseClick} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ExerciseCategory;