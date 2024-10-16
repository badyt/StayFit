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
    totalValues: DietHistoryEntry | undefined;
    onClose: () => void;
}
const DietHistoryDay: React.FC<ModalProps> = ({ date, totalValues, onClose }) => {
    const { user } = useLoginStore();
    const [calories, setCalories] = useState<number | ''>('');
    const [protiens, setProtiens] = useState<number | ''>('');

    const handleUpdate = async () => {
        if (calories && calories > 0 && protiens && protiens > 0) {
            try {
                const response = await (await fetch(`${url}/completeDiet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user?.userId,
                        totalCalories: calories,
                        totalProteins: protiens,
                        date: date,
                        minutesOffset: date.getTimezoneOffset()
                    })
                })).json();
                if (response.error) {
                    toast.error(`${response.error}`)
                } else {

                    toast.info("successfully completed diet.");
                }
            } catch (error) {
                console.error('Error completing diet:', error);
            }
            onClose(); // Close the modal after adding
        } else {
            toast.warn("Please fill in all fields!");
        }
    };

    const renderDay = () => {
        return (totalValues !== undefined) ?
            <div className="value-text">
                <span>Calories: {totalValues.totalCalories}</span>
                <span>Protiens: {totalValues.totalProteins}</span>
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
                    <div className="input-group">
                        <label htmlFor="protiens">Protiens</label>
                        <input
                            type="number"
                            id="protiens"
                            value={protiens}
                            onChange={(e) => setProtiens(Number(e.target.value))}
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

export default DietHistoryDay;
