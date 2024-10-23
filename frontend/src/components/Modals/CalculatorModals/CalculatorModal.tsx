// Modal.tsx
import React, { useEffect, useRef } from "react";
import "../GeneralModal.css";
import { Dayjs } from "dayjs";
interface DataProps {
    avgCalories: number;
    avgCaloriesBurnt: number;
    avgProteins: number;
    dietDays: number;
    workoutDays: number;
}
interface Props {
    data: DataProps;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    initialWeight: number;
    finalWeight: number;
    onClose: () => void;
}
const CalculatorModal: React.FC<Props> = ({ data, startDate, endDate, initialWeight, finalWeight, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    // const formateStartdDate = startDate.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    // const formatedEndDate = endDate.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay">
            <div className="modal-container" style={{ width: "auto" }} ref={modalRef}>
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h3>{startDate?.toString()} - {endDate?.toString()}</h3>
                <div className="modal-content">
                    <h5 className="modal-description">Average Calories Burnt in {data.workoutDays} Workout Recorded Days is: {data.avgCaloriesBurnt}</h5>
                    <h5 className="modal-description">Average Calories Taken in {data.dietDays} Diet Recorded Days is: {data.avgCalories}</h5>
                    <h5 className="modal-description">Average Calories Taken in {data.dietDays} Diet Recorded Days is: {data.avgProteins}</h5>
                </div>
            </div>
        </div>

    );
};

export default CalculatorModal;
