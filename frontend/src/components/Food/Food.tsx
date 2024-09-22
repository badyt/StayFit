import useFoodStore from '../../stores/foodstore';
import config from '../../../config';
import { useEffect } from 'react';
import './Food.css';
import { Typography } from '@mui/material';
import FoodCell from './FoodCell';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

interface FoodData {
    name: string;
    calories_per_100g: number;
    protein_per_100g: number;
}

export default function FoodComponent() {
    const { foodData, setFoodData } = useFoodStore();
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

    const onCellClick = (food : FoodData) => {
        console.log(" clicked ");
    }

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
                        <FoodCell food={foodCell} onClick={onCellClick} />
                    ))}

            </div>
        </>
    );
}