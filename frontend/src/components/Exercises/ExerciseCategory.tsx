import React from 'react';
import Exercise from './Exercise';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Exercises.css';
import Slider from 'react-slick';
interface CategoryProps {
    category: ExerciseCategory;
}

const ExerciseCategory: React.FC<CategoryProps> = ({ category }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    return (
        <div className="category">
            <h2>{category.name}</h2>
            <Slider {...settings}>
                {category.exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </Slider>
        </div>
    );
};

export default ExerciseCategory;