import React, { useEffect, useState } from "react";
import useLoginStore from "../../stores/loginstore";
import WorkoutHistoryDay from "../Modals/HistoryModals/WorkoutHistoryDayModel";
import HistoryPlan from "../HistoryPlan";
import useWorkoutHistoryStore from "../../stores/workouthistorystore";

interface SelectedDay {
    date: Date;
    workoutValues: WorkoutHistoryEntry | undefined;
}

const WorkoutHistory: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
    const { user } = useLoginStore();
    const { workoutHistory, fetchWorkoutHistory } = useWorkoutHistoryStore();
    // Fetch diet history once when the component mounts
    useEffect(() => {
        if (user?.userId) {
            fetchWorkoutHistory(user.userId);
        }
    }, [user?.userId]); // Only runs on mount


    // Check if a diet is completed for the given day
    const isDietCompleted = (year: number, month: number, day: number) => {
        const yearString = year.toString();
        const monthString = String(month + 1).padStart(2, '0');
        const dayString = String(day).padStart(2, '0');
        return workoutHistory?.[yearString]?.[monthString]?.[dayString] !== undefined;
    };

    const handleDayClick = (date: Date, isCompleted: boolean) => {
        if (isCompleted) {
            const yearString = date.getFullYear().toString();
            const monthString = String(date.getMonth() + 1).padStart(2, '0');
            const dayString = String(date.getDate()).padStart(2, '0');
            const totalValues = workoutHistory?.[yearString]?.[monthString]?.[dayString];
            setSelectedDay({ date: date, workoutValues: totalValues })
        } else {
            setSelectedDay({ date: date, workoutValues: undefined })
        }
    }

    const handleCloseModal = () => {
        setSelectedDay(null);
    };

    return (
        <>
            <HistoryPlan isDayCompleted={isDietCompleted} handleDayClick={handleDayClick} />
            {selectedDay && (
                <WorkoutHistoryDay
                    date={selectedDay.date}
                    workoutValues={selectedDay.workoutValues}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default WorkoutHistory;
