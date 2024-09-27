// Modal.tsx
import React, { useEffect, useRef } from "react";
import "./ExerciseModal.css";
import config from "../../../config";
import { toast } from "react-toastify";
import useLoginStore from "../../stores/loginstore";
import useRoutineStore from "../../stores/routinestore";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

interface ModalProps {
  exercise: Exercise;
  day: string | null;
  onClose: () => void;
}
const imagesUrl = '../../../images/Exercises';
const RoutineExerciseModal: React.FC<ModalProps> = ({ exercise, day, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { fetchRoutineData } = useRoutineStore();
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

  const handleRemoveExercise = async (exercise: Exercise, day: string | null) => {
    try {
      const response = await (await fetch(`${url}/removeExerciseFromRoutine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          userId: user?.userId,
          day: day,
          exercise: exercise
        })
      })).json();

      if (response.error || !response) {
        toast.error(`error occured while removing exercise!`);
        return;
      }
      toast.info("successfully removed exercise!");
      fetchRoutineData(user?.userId);
    } catch (error) {
      console.error('Error removing exercise:', error);
    } finally {
      onClose()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">{exercise.name}</h2>
        <div className="modal-content">
          <img src={`${imagesUrl}/${exercise.image}`} alt={exercise.name} className="modal-image" />
          <div className="modal-description-container">
            <h3>Description</h3>
            <p className="modal-description">{exercise.description}</p>
          </div>
        </div>
        <button className="modal-remove-button" onClick={() => handleRemoveExercise(exercise, day)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RoutineExerciseModal;
