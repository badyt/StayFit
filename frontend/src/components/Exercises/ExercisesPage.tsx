import './Exercises.css';
import ExerciseCategory from './ExerciseCategory';
import { useEffect, useState } from "react";
import config from '../../../config';
import useExercisesStore from "../../stores/exercisesstore";
import ExerciseModal from "../Modals/ExercisesModals/ExerciseModal";
import PageTabs from "../PageTabs";
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;

export default function ExercisesPage() {
    const tabs = ["Chest", "Back", "Leg", "Shoulder", "Biceps", "Abs", "Hamstrings", "Glutes", "Quadriceps", "Calves"];
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const { exercisesData, setExercisesData } = useExercisesStore();
    const [selectedTab, setTab] = useState<string>(tabs[0])

    const handleExerciseClick = (exercise: Exercise) => {
        setSelectedExercise(exercise);
    };
    const handleCloseModal = () => {
        setSelectedExercise(null);
    };

    const fetchExercisesData = async () => {
        try {
            const response = await fetch(`${url}/getAllExercises`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setExercisesData(data);
        } catch (error) {
            console.error('Error fetching exercises data:', error);
        }
    };

    useEffect(() => {
        if (!exercisesData) {
            fetchExercisesData();
        }
    }, []);

    const renderContent = () => {
        // Check if a category matches the selected tab
        const filteredCategory = exercisesData?.find(category => `${selectedTab} Exercises` === category.name);
        return (filteredCategory) ?
            <ExerciseCategory key={filteredCategory.id} category={filteredCategory} onExerciseClick={handleExerciseClick} />
            : null
    };

    return (
        <>
            <PageTabs selectedTab={selectedTab} setTab={setTab} tabValues={tabs}></PageTabs>
            <div style={{ marginRight: "auto" }}>
                {renderContent()}
            </div>
            {selectedExercise && (
                <ExerciseModal
                    exercise={selectedExercise}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}