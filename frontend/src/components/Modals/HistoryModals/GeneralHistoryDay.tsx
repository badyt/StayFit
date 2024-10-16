// Modal.tsx
import React, { useEffect, useRef } from "react";
import "../GeneralModal.css";
interface Props {
    date: Date;
    onClose: () => void;
    renderDay: () => JSX.Element;
}
const HistoryDay: React.FC<Props> = ({ date, onClose, renderDay }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const formatedDate = date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    const dayName = date.toLocaleDateString(undefined, { weekday: "long" });
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
                <h3>{formatedDate}</h3>
                <h4>{dayName}</h4>
                {renderDay()}
            </div>
        </div>

    );
};

export default HistoryDay;
