// Modal.tsx
import React, { useEffect, useRef } from "react";
import "./RoutineExerciseModal.css"
interface ModalProps {
  title: string;
  image: string;
  description: string;
  onClose: () => void;
}
const imagesUrl = '../../../images/Exercises';
const RoutineExerciseModal: React.FC<ModalProps> = ({ title, image, description, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
        <h2 className="modal-title">{title}</h2>
        <img src={`${imagesUrl}/${image}`} alt={title} className="modal-image" />
        <h3 style={{margin: 0}}>Description</h3>
        <p className="modal-description">{description}</p>
      </div>
    </div>
  );
};

export default RoutineExerciseModal;
