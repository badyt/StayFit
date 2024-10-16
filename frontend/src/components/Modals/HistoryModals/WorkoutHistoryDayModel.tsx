// Modal.tsx
import React, { useState } from "react";
import "../GeneralModal.css";
import { toast } from "react-toastify";
import useLoginStore from "../../../stores/loginstore";
import config from "../../../../config";
import HistoryDay from "./GeneralHistoryDay";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface ModalProps {
    date: Date;
    workoutValues: WorkoutHistoryEntry | undefined;
    onClose: () => void;
}
const WorkoutHistoryDay: React.FC<ModalProps> = ({ date, workoutValues, onClose }) => {
    const { user } = useLoginStore();
    const [calories, setCalories] = useState<number | ''>('');

    const handleUpdate = async () => {
        if (calories && calories > 0) {
            try {
                const response = await (await fetch(`${url}/completeWorkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user?.userId,
                        totalCalories: calories,
                        date: date,
                        minutesOffset: date.getTimezoneOffset()
                    })
                })).json();
                if (response.error) {
                    toast.error(`${response.error}`)
                } else {

                    toast.info("successfully completed Workout.");
                }
            } catch (error) {
                console.error('Error completing Workout:', error);
            }
            onClose(); // Close the modal after adding
        } else {
            toast.warn("Please fill in all fields!");
        }
    };

    const renderDay = () => {
        return (workoutValues !== undefined) ?
            <div className="value-text">
                <span>Calories: {workoutValues.totalCalories}</span>
            </div>
            :
            <>
                <div className="modal-add-section">

                    <div className="input-group">
                        <label htmlFor="calories">Calories</label>
                        <input
                            type="number"
                            id="calories"
                            value={calories}
                            onChange={(e) => setCalories(Number(e.target.value))}
                            min={0}
                            placeholder="0"
                        />
                    </div>
                </div>
                <button className="modal-add-button" onClick={handleUpdate}>
                    Update
                </button>
            </>
    }

    return (
        <HistoryDay date={date} onClose={onClose} renderDay={renderDay} />
    );
};

export default WorkoutHistoryDay;
