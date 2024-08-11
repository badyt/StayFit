import React, { useEffect, useRef, useState } from 'react';
import Exercise from './Exercise';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Exercises.css';
interface CategoryProps {
    category: ExerciseCategory;
}

const ExerciseCategory: React.FC<CategoryProps> = ({ category }) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                console.log(scrollLeft, scrollWidth, clientWidth);
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(Math.round(scrollLeft) + clientWidth < scrollWidth);
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth, behavior: 'smooth' });
        }
    };
    return (
        <>
            <h2 style={{ display: "flex", marginLeft: "1rem" }}>{category.name}</h2>
                {showLeftArrow && <ArrowBackIosNewIcon className="scroll-arrow left" onClick={scrollLeft}/>}
                <div id = "categoryContainer" className="scroll-container" ref={scrollContainerRef}>
                    <div className='exercise-row'>
                        {category.exercises.map((exercise) => (
                            <Exercise key={exercise.id} exercise={exercise} />
                        ))}
                    </div>
                </div>
                {showRightArrow && <ArrowForwardIosIcon className="scroll-arrow right" onClick={scrollRight} />}
        </>
    );
};

export default ExerciseCategory;