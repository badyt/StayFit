import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { format, addMonths, subMonths, isAfter } from "date-fns"; // Helper functions for dates
import useDietHistoryStore from "../../stores/diethistorystore";
import useLoginStore from "../../stores/loginstore";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './DietHistory.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DietHistory: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
    const { user } = useLoginStore();
    const { dietHistory, fetchDietHistory } = useDietHistoryStore();
    const today = new Date();

    // Fetch diet history once when the component mounts
    useEffect(() => {
        if (user?.userId) {
            fetchDietHistory(user.userId);
        }
    }, [dietHistory]); // Only runs on mount

    // Update the list of days in the current month when the month changes
    useEffect(() => {
        const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
        setDaysInMonth(days);
    }, [currentMonth]);

    // Function to calculate all the days in the current month
    const getDaysInMonth = (year: number, month: number) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    // Check if a diet is completed for the given day
    const isDietCompleted = (year: number, month: number, day: number) => {
        const yearString = year.toString();
        const monthString = String(month + 1).padStart(2, '0');
        const dayString = String(day).padStart(2, '0');
        return dietHistory?.[yearString]?.[monthString]?.[dayString] !== undefined;
    };

    // Handle previous month button click
    const handlePrevMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    // Handle next month button click
    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1);
        const now = new Date();
        if (!isAfter(nextMonth, now)) {
            setCurrentMonth(nextMonth);
        }
    };

    const startDay = daysInMonth[0]?.getDay();

    return (
        <div className="diet-history-container">
            <div className="month-navigation">
                <IconButton onClick={handlePrevMonth}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h5" className="current-month">
                    {format(currentMonth, "MMMM yyyy")}</Typography>
                <IconButton onClick={handleNextMonth}
                    disabled={isAfter(addMonths(currentMonth, 1), new Date())}  >
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>

            <Grid container spacing={2} className="calendar-grid">
                {/* Render the days of the week */}
                {daysOfWeek.map((day) => (
                    <Grid item xs={1.5} key={day}>
                        <Typography variant="subtitle1" className="day-label">{day}</Typography>
                    </Grid>
                ))}

                {Array.from({ length: startDay }).map((_, index) => (
                    <Grid item xs={1.5} key={`empty-${index}`} className="calendar-day empty" />
                ))}

                {/* Render all the days in the current month */}
                {daysInMonth.map((date) => {
                    const isFuture = date > today; // Check if the date is in the future
                    const isCompleted = isDietCompleted(date.getFullYear(), date.getMonth(), date.getDate());
                    return (
                      <Grid
                        item
                        xs={1.5}
                        key={date.getDate()}
                        className={`calendar-day ${isCompleted ? 'completed' : ''}`}
                        style={isFuture ? { pointerEvents: 'none', opacity: 0.5 } : {}} // Disable future days
                      >
                        <Typography variant="body1" className="day-number">{date.getDate()}</Typography>
                        {/* Display a checkmark if the diet is completed */}
                        {isCompleted && (
                          <CheckCircle color="success" className="completed-icon" />
                        )}
                      </Grid>
                    );
})}
            </Grid>
        </div>
    );
};

export default DietHistory;
