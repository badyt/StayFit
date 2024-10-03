// Modal.tsx
import React, { useEffect, useState, useRef } from "react";
import "../GeneralModal.css"
import config from "../../../../config";
import useLoginStore from "../../../stores/loginstore";
import { toast } from "react-toastify";
import useRoutineStore from "../../../stores/routinestore";

const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
interface ModalProps {
  exercise: Exercise;
  onClose: () => void;
}
const imagesUrl = '../../../images/Exercises';
const ExerciseModal: React.FC<ModalProps> = ({ exercise, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useLoginStore();
  const { fetchRoutineData } = useRoutineStore();
  const [sets, setSets] = useState<number | ''>('');
  const [reps, setReps] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  const handleAdd = async () => {
    if (sets && reps && weight && selectedDay) {
      try {
        const response = await (await fetch(`${url}/addExerciseToRoutine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.userId,
            day: selectedDay,
            exercise: exercise,
            sets: sets,
            reps: reps,
            weight: weight
          })
        })).json();
        if (response.error) {
          toast.error(`${response.error}`)
        } else {
          fetchRoutineData(user?.userId)
          toast.info("successfully added exercise to routine");
        }
      } catch (error) {
        console.error('Error Adding Exercise to Routine:', error);
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
        <h2 className="modal-title">{exercise.name}</h2>
        <div className="modal-content">
          <img src={`${imagesUrl}/${exercise.image}`} alt={exercise.name} className="modal-image" />
          <div className="modal-description-container">
            <h3>Description</h3>
            <p className="modal-description">{exercise.description}</p>
          </div>
          {/* <h3>Add Workout Details</h3> */}
          <div className="modal-add-section">

            <div className="input-group">
              <label htmlFor="sets">Sets</label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(Math.min(Number(e.target.value), 20))}
                max={20}
                placeholder="0"
              />
            </div>
            <div className="input-group">
              <label htmlFor="reps">Reps</label>
              <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(Math.min(Number(e.target.value), 100))}
                max={100}
                placeholder="0"
              />
            </div>
            <div className="input-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(Math.min(Number(e.target.value), 500))}
                max={500}
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
          <button className="modal-add-button" onClick={handleAdd}>
            Add to Routine
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
