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
    weightValue: WeightHistoryEntry | undefined;
    onClose: () => void;
}
const WeightHistoryDay: React.FC<ModalProps> = ({ date, weightValue, onClose }) => {
    console.log(weightValue?.weight);
    
    const { user } = useLoginStore();
    const [weight, setWeight] = useState<number | ''>('');

    const handleUpdate = async () => {
        if (weight && weight > 0) {
            try {
                const response = await (await fetch(`${url}/updateWeight`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user?.userId,
                        weight: weight,
                        date: date,
                        minutesOffset: date.getTimezoneOffset()
                    })
                })).json();
                if (response.error) {
                    toast.error(`${response.error}`)
                } else {

                    toast.info("successfully updated weight.");
                }
            } catch (error) {
                console.error('Error updating weight:', error);
            }
            onClose(); // Close the modal after adding
        } else {
            toast.warn("Please fill in all fields!");
        }
    };

    const renderDay = () => {
        return (weightValue !== undefined) ?
            <div className="value-text">
                <span>Weight: {weightValue.weight}</span>
            </div>
            :
            <>
                <div className="modal-add-section">

                    <div className="input-group">
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
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

export default WeightHistoryDay;
