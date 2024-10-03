// Day.tsx
import React from "react";

interface DayProps {
    day: string;
    meals: Meal[] | null;
    onMealClick: (meal: Meal, day: string) => void;
}

const DietDay: React.FC<DayProps> = ({ day, meals, onMealClick }) => {
    return (
        <div className="day-container">
            <h2 className="day-title">{day}</h2>
            {(meals?.length ?? null) ? <ul className="item-list">
                {meals?.map((meal, index) => (
                    <li key={index} className="item">
                        <button
                            className="item-button"
                            onClick={() => onMealClick(meal, day)}
                        >
                            <div className="item-content">
                                <span className="item-name">{index + 1}. {meal.food.name}</span>
                                <div className="item-details">
                                    <span className="item-child">Time: {meal.time}</span>
                                    <span className="item-child">Grams: {meal.grams}</span>
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul> : <p>Not Planned</p>}
        </div>
    );
};

export default DietDay;
