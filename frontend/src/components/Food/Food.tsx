import useFoodStore from '../../stores/foodstore';
import config from '../../../config';
import { useEffect, useState } from 'react';
import './Food.css';
import { Typography } from '@mui/material';
import FoodCell from './FoodCell';
import FoodModal from '../Modals/FoodModals/FoodModal';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

export default function FoodComponent() {
    const { foodData, setFoodData } = useFoodStore();
    const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);

    const handleFoodClick = (food: FoodData) => {
        setSelectedFood(food);
    };
    const handleCloseModal = () => {
        setSelectedFood(null);
    };

    const fetchFoodData = async () => {
        try {
            const response = await fetch(`${url}/getAllFood`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            const rowsWithId = data.map((row: FoodData, index: number) => {
                // Assign an incrementing numeric ID to each row
                return { ...row, id: index, image: `../../../images/Food/${row.name}.png` };
            });
            setFoodData(rowsWithId);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    useEffect(() => {
        if (!foodData) {
            fetchFoodData();
        }
    }, []);
    return (
        <>
            <Typography fontSize={"28px"}
                fontFamily={"Garamond"}
                fontWeight={"bold"}
                marginBottom={"1rem"}>Food Menu</Typography>
            <div className='food-container'>
                {foodData?.map((foodCell) => (
                    <FoodCell food={foodCell} onClick={handleFoodClick} />
                ))}

            </div>
            {selectedFood && (
                <FoodModal
                    food={selectedFood}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}