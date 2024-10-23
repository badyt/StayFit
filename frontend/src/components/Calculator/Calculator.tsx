import React, { useState } from "react";
import { Button, Typography, TextField, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import "./Calculator.css"; // You can style this further
import config from "../../../config";
import useLoginStore from "../../stores/loginstore";
import { toast } from "react-toastify";
import CalculatorModal from "../Modals/CalculatorModals/CalculatorModal";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

const inputStyles = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "var(--border-color)", // Default border color
        },
        "&:hover fieldset": {
            borderColor: "var(--button-hover-bg-color)", // Border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "#90caf9", // Border color on focus
        },
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "var(--primary-text-color)", // Label color when focused
    },
};

interface CalculationProps {
    avgCalories: number;
    avgCaloriesBurnt: number;
    avgProteins: number;
    dietDays: number;
    workoutDays: number;
}

const Calculator: React.FC = () => {
    const [calculation, setCalculation] = useState<CalculationProps | null>(null);
    const { user } = useLoginStore();
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [initialWeight, setInitialWeight] = useState<string>("");
    const [finalWeight, setFinalWeight] = useState<string>("");


    const isLegalWeight = (weight: number): boolean => {
        return (weight > 0 && weight < 500) ? true : false;
    }

    const handleCloseModal = () => {
        setCalculation(null);
    };

    const handleCalculate = async () => {
        if (startDate && endDate && initialWeight && finalWeight
            && isLegalWeight(Number(initialWeight)) && isLegalWeight(Number(finalWeight))) {
            try {
                console.log(user?.userId);
                const response = await (await fetch(`${url}/calculateAvgNutrients?userId=${user?.userId}&startDate=${startDate}&endDate=${endDate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })).json();
                if (response.error) {
                    toast.error(`${response.error}`)
                } else {
                    toast.info("successfully calculated.");
                    console.log(response);
                    setCalculation(response.data)
                }
            } catch (error) {
                console.error('Error calculating:', error);
            }
        } else {
            toast.warn("Please fill in all fields!");
        }
    };

    return (
        <>
            <Box className="calculator-container">
                <Typography variant="h5" className="calculator-title">Smart Calculator</Typography>

                <Box className="input-container">
                    <div className="date-pickers">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={inputStyles}
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                    if (newValue && endDate && newValue.isAfter(endDate)) {
                                        setEndDate(null); // Reset end date if it is before start date
                                    }
                                }}
                                shouldDisableDate={(date) => date.isAfter(dayjs())} // Disable future dates
                            />
                            <DatePicker
                                sx={inputStyles}
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                    if (newValue && startDate && newValue.isBefore(startDate)) {
                                        setStartDate(null); // Reset start date if it is after end date
                                    }
                                }}
                                shouldDisableDate={(date) =>
                                    date.isAfter(dayjs()) || (startDate ? date.isBefore(startDate) : false) // Disable future dates and dates before start date
                                }
                            />
                        </LocalizationProvider>
                    </div>
                    <TextField
                        label="Initial Weight (kg)"
                        value={initialWeight}
                        sx={inputStyles}
                        onChange={(e) => setInitialWeight(e.target.value)}
                        className="weight-input"
                        type="number"
                    />

                    <TextField
                        label="Final Weight (kg)"
                        value={finalWeight}
                        sx={inputStyles}
                        onChange={(e) => setFinalWeight(e.target.value)}
                        className="weight-input"
                        type="number"
                    />

                    <Button
                        variant="outlined"
                        color="success"
                        onClick={handleCalculate}
                    >
                        Calculate
                    </Button>
                </Box>
            </Box>
            {calculation && (
                <CalculatorModal
                    data={calculation}
                    startDate={startDate}
                    endDate={endDate}
                    initialWeight={Number(initialWeight)}
                    finalWeight={Number(finalWeight)}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default Calculator;
