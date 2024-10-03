// Modal.tsx
import React, { useEffect, useState, useRef } from "react";
import "../GeneralModal.css";
import "./FoodModal.css";
import config from "../../../../config";
import useLoginStore from "../../../stores/loginstore";
import { toast } from "react-toastify";
import useDietPlanStore from "../../../stores/dietplanstore";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface ModalProps {
    food: FoodData;
    onClose: () => void;
}
const imagesUrl = '../../../images/Food';
const FoodModal: React.FC<ModalProps> = ({ food, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>('12:00');
    const [grams, setGrams] = useState<number | ''>('');
    const [selectedDay, setSelectedDay] = useState<string>('');
    const { fetchDietPlan } = useDietPlanStore();
    const { user } = useLoginStore();

    const handleAdd = async () => {
        if (time && grams && selectedDay) {
            const totalCalories = grams * food.calories_per_100g / 100;
            const totalProtien = grams * food.protein_per_100g / 100;
            try {
                const response = await (await fetch(`${url}/addMealToDiet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user?.userId,
                        day: selectedDay,
                        meal: {
                            food: food,
                            time: time,
                            grams: grams,
                            totalCalories: totalCalories,
                            totalProtien: totalProtien
                        }
                    })
                })).json();
                if (response.error) {
                    toast.error(`${response.error}`)
                } else {
                    fetchDietPlan(user?.userId)
                    toast.info("successfully added meal to diet");
                }
            } catch (error) {
                console.error('Error Adding Meal to Diet:', error);
            }
            onClose(); // Close the modal after adding
        } else {
            toast.warn("Please fill in all fields!");
        }
    };

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
            <div className="modal-container" ref={modalRef}>
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">{food.name}</h2>
                <div className="modal-content">
                    <img src={`${imagesUrl}/${food.name}.png`} alt={food.name} className="modal-image" />
                    <div className="modal-description-container">
                        <h3>Description</h3>
                        <p className="modal-description">Calories (100g): {food.calories_per_100g}<br />
                            Protien (100g): {food.protein_per_100g}</p>
                    </div>
                    <div className="modal-add-section" style={{ marginLeft: "8rem" }}>
                        <div className="input-group">
                            <label>Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="grams">Grams</label>
                            <input
                                type="number"
                                id="grams"
                                value={grams}
                                onChange={(e) => setGrams(Number(e.target.value))}
                                min={0}
                                placeholder="0"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="day" style={{ marginRight: "1rem" }}>Day</label>
                            <select
                                id="day"
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                            >
                                <option value="">Select a Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-add-section">
                        <div className="calculations-group">
                            <label htmlFor="calories">Total Calories:  </label>
                            <input
                                type="number"
                                id="calories"
                                value={(grams) ? (grams * food.calories_per_100g / 100) : 0}
                                readOnly={true}
                                min={0}
                                placeholder="0"
                            />
                        </div>
                        <div className="calculations-group">
                            <label htmlFor="protien">Total Protien:  </label>
                            <input
                                type="number"
                                id="protien"
                                value={(grams) ? (grams * food.protein_per_100g / 100) : 0}
                                readOnly={true}
                                min={0}
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>
                <button className="modal-add-button" onClick={handleAdd}>
                    Add to Diet
                </button>
            </div>
        </div>
    );
};

export default FoodModal;
