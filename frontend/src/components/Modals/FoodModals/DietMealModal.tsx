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
    meal: Meal;
    day: string | null;
    onClose: () => void;
}
const imagesUrl = '../../../images/Food';
const DietMealModal: React.FC<ModalProps> = ({ meal, day, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { fetchDietPlan } = useDietPlanStore();
    const { user } = useLoginStore();


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

    const handleRemoveMeal = async (meal: Meal, day: string | null) => {
        try {
            const response = await (await fetch(`${url}/removeMealFromDiet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    userId: user?.userId,
                    day: day,
                    meal: meal
                })
            })).json();

            if (response.error || !response) {
                toast.error(`error occured while removing meal!`);
                return;
            }
            toast.info("successfully removed meal!");
            fetchDietPlan(user?.userId);
        } catch (error) {
            console.error('Error removing meal:', error);
        } finally {
            onClose()
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container" ref={modalRef}>
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">{meal.food.name}</h2>
                <div className="modal-content">
                    <img src={`${imagesUrl}/${meal.food.name}.png`} alt={meal.food.name} className="modal-image" />
                    <div className="modal-description-container">
                        <p className="modal-description">{meal.grams} Grams of {meal.food.name} <br />
                            Contains: {meal.totalCalories} Calories, {meal.totalProtien} Protien.</p>
                    </div>
                </div>
                <button className="modal-remove-button" onClick={() => handleRemoveMeal(meal, day)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default DietMealModal;
