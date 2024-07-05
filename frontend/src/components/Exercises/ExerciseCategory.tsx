import React from 'react';
import Exercise from './Exercise';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Exercises.css';
interface CategoryProps {
    category: ExerciseCategory;
}

const ExerciseCategory: React.FC<CategoryProps> = ({ category }) => {
    return (
        <>
            <h2 style={{ display: "flex" , marginLeft:"1rem"}}>{category.name}</h2>
            <div className='exercise-row'>
                {category.exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </>
    );
};

export default ExerciseCategory;