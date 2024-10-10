import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import useDietHistoryStore from "../../stores/diethistorystore"; // Assume this hook fetches diet history
import { format, addMonths, subMonths } from "date-fns"; // You can install date-fns with `npm install date-fns`
import useLoginStore from "../../stores/loginstore";
import './DietHistory.css';
const DietHistory: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { user } = useLoginStore();
  const { fetchDietHistory, dietHistory } = useDietHistoryStore(); // Assuming you have a store to fetch diet history

  useEffect(() => {
    fetchDietHistory(user?.userId);
  }, [dietHistory]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const renderHistoryForMonth = () => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed

    return (
      <div className="diet-history-month">
        {dietHistory?.[year]?.[month] ? (
          Object.entries(dietHistory[year][month]).map(([day, { totalCalories, totalProteins }]) => (
            <div key={day} className="diet-history-day">
              <Typography variant="body1">{`Date: ${day}`}</Typography>
              <Typography variant="body2">{`Calories: ${totalCalories}`}</Typography>
              <Typography variant="body2">{`Proteins: ${totalProteins}`}</Typography>
            </div>
          ))
        ) : (
          <Typography variant="body1">No diet history for this month.</Typography>
        )}
      </div>
    );
  };

  return (
    <div className="diet-history">
      <Typography variant="h4" gutterBottom>
        Diet History
      </Typography>
      <div className="month-navigation">
        <Button onClick={handlePrevMonth} variant="contained" color="primary">Previous Month</Button>
        <Typography variant="h5" className="current-month">
          {format(currentMonth, "MMMM yyyy")} {/* Displays current month and year */}
        </Typography>
        <Button onClick={handleNextMonth} variant="contained" color="primary">Next Month</Button>
      </div>
      {renderHistoryForMonth()}
    </div>
  );
};

export default DietHistory;
