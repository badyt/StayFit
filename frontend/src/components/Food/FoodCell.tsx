import React from 'react';
import './Food.css';
interface FoodData {
    name: string;
    calories_per_100g: number;
    protein_per_100g: number;
}

interface FoodCellProps {
    food: FoodData;
    onClick: (food: FoodData) => void;
}
const imagesUrl = '../../images/Food';
const FoodCell: React.FC<FoodCellProps> = ({ food, onClick }) => {
    return (
        <div className="food-cell" onClick={() => onClick(food)}>
            <img src={`${imagesUrl}/${food.name}.png`} alt={food.name} />
            <p>{food.name}</p>
            <p>Calories: {food.calories_per_100g}</p>
            <p>Protein: {food.protein_per_100g}</p>
        </div>
    );
};

export default FoodCell;



