import React, { useEffect, useState } from "react";
import useLoginStore from "../../stores/loginstore";
import WeightHistoryDay from "../Modals/HistoryModals/WeightHistoryDayModal";
import HistoryPlan from "../HistoryPlan";
import useWeightHistoryStore from "../../stores/weighthistorystore";

interface SelectedDay {
    date: Date;
    totalWeight: WeightHistoryEntry | undefined;
}

const WeightMeasurements: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
    const { user } = useLoginStore();
    const { weightHistory, fetchWeightHistory } = useWeightHistoryStore();
    // Fetch diet history once when the component mounts
    useEffect(() => {
        if (user?.userId) {
            fetchWeightHistory(user.userId);
        }
    }, [user?.userId]); // Only runs on mount


    // Check if a diet is completed for the given day
    const isDietCompleted = (year: number, month: number, day: number) => {
        const yearString = year.toString();
        const monthString = String(month + 1).padStart(2, '0');
        const dayString = String(day).padStart(2, '0');
        return weightHistory?.[yearString]?.[monthString]?.[dayString] !== undefined;
    };

    const handleDayClick = (date: Date, isCompleted: boolean) => {
        if (isCompleted) {
            const yearString = date.getFullYear().toString();
            const monthString = String(date.getMonth() + 1).padStart(2, '0');
            const dayString = String(date.getDate()).padStart(2, '0');
            const totalWeight = weightHistory?.[yearString]?.[monthString]?.[dayString];
            setSelectedDay({ date: date, totalWeight: totalWeight })
        } else {
            setSelectedDay({ date: date, totalWeight: undefined })
        }
    }

    const handleCloseModal = () => {
        setSelectedDay(null);
    };
    

    return (
        <>
            <HistoryPlan isDayCompleted={isDietCompleted} handleDayClick={handleDayClick} />
            {selectedDay && (
                <WeightHistoryDay
                    date={selectedDay.date}
                    weightValue={selectedDay.totalWeight}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default WeightMeasurements;
