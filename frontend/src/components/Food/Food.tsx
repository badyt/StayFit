import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useFoodStore from '../../stores/foodstore';
import config from '../../../config';
import { useEffect } from 'react';
import './Food.css';
import { Typography } from '@mui/material';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

interface FoodData {
    name: string;
    calories_per_100g: number;
    protein_per_100g: number;
}

const columns: GridColDef<FoodData>[] = [
    { field: 'name', headerName: 'Name', width: 250 },
    {
        field: 'calories_per_100g',
        headerName: 'Calories (100g)',
        type: 'number',
        width: 150,
        cellClassName: 'centered-cell',
    },
    {
        field: 'protein_per_100g',
        headerName: 'Protein (100g)',
        type: 'number',
        width: 150,
        cellClassName: 'centered-cell',
    },
    {
        field: 'image',
        headerName: 'Image',
        width: 150,
        headerAlign: 'center',
        renderCell: (params) => (
            <img src={params.value} alt="Food" style={{ width: '100%', height: '100%' }} />
        ),
    }
];


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

    useEffect(() => {
        if (!foodData) {
            fetchFoodData();
        }
    }, []);
    return (
        <div className='food-wrapper'>
            <Typography fontSize={"28px"}
                    fontFamily={"serif"}
                    fontWeight={"bold"} 
                    marginBottom={"1rem"}>Food Menu</Typography>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={(foodData !== null) ? foodData : []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    className="centered-columns"
                />
            </Box>
        </div>
    );
}