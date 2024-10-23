import React, { useEffect, useState } from "react";
import useDietHistoryStore from "../../stores/diethistorystore";
import useLoginStore from "../../stores/loginstore";
import DietHistoryDay from "../Modals/HistoryModals/DietHistoryDayModal";
import HistoryPlan from "../HistoryPlan";

interface SelectedDay {
    date: Date;
    totalValues: DietHistoryEntry | undefined;
}

const DietHistory: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
    const { user } = useLoginStore();
    const { dietHistory, fetchDietHistory } = useDietHistoryStore();
    // Fetch diet history once when the component mounts
    useEffect(() => {
        if (user?.userId) {
            fetchDietHistory(user.userId);
        }
    }, [user?.userId]); // Only runs on mount


    // Check if a diet is completed for the given day
    const isDietCompleted = (year: number, month: number, day: number) => {
        const yearString = year.toString();
        const monthString = String(month + 1).padStart(2, '0');
        const dayString = String(day).padStart(2, '0');
        return dietHistory?.[yearString]?.[monthString]?.[dayString] !== undefined;
    };

    const handleDayClick = (date: Date, isCompleted: boolean) => {
        if (isCompleted) {
            const yearString = date.getFullYear().toString();
            const monthString = String(date.getMonth() + 1).padStart(2, '0');
            const dayString = String(date.getDate()).padStart(2, '0');
            const totalValues = dietHistory?.[yearString]?.[monthString]?.[dayString];
            setSelectedDay({ date: date, totalValues: totalValues })
        } else {
            setSelectedDay({ date: date, totalValues: undefined })
        }
    }

    const handleCloseModal = () => {
        setSelectedDay(null);
    };

    return (
        <>
            <HistoryPlan isDayCompleted={isDietCompleted} handleDayClick={handleDayClick} />
            {selectedDay && (
                <DietHistoryDay
                    date={selectedDay.date}
                    totalValues={selectedDay.totalValues}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default DietHistory;
