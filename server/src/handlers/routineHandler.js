const Database = require('../database/my-database');
const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const { Routines_Collection, Workout_History } = require('../globals');

const addExerciseToRoutine = async (req) => {
    const { userId, day, exercise, sets, reps, weight } = req.body;
    let userRoutine = await Database.findOne(Routines_Collection, { _id: userId });
    if (!userRoutine) {
        userRoutine = createEmptyRoutine(userId);
        userRoutine = addExerciseToDay(userRoutine, day, exercise, sets, reps, weight);
        await Database.insertOne(Routines_Collection, userRoutine);
        return true;
    } else if (checkExerciseInDay(exercise.name, day, userRoutine))
        throw new Error(`Exercise already exists in ${day}`);
    else {
        userRoutine = addExerciseToDay(userRoutine, day, exercise, sets, reps, weight);
        await Database.updateOne(Routines_Collection, { _id: userId }, { days: userRoutine.days });
        return true;
    }
}

const removeExerciseFromRoutine = async (req) => {
    const { userId, day, exercise } = req.body;
    didRemove = false;
    let userRoutine = await Database.findOne(Routines_Collection, { _id: userId });
    if (!userRoutine) {
        throw new Error(`Error finding user routine`);
    } else {
        didRemove = await removeExerciseFromDay(userRoutine, day, exercise);
    }
    return didRemove;
}

const checkExerciseInDay = (exerciseName, day, userRoutine) => {
    exerciseDoesExist = searchExercise(exerciseName, userRoutine.days[DaysOfWeek.indexOf(day)].exercises);
    return exerciseDoesExist
}

const searchExercise = (exerciseName, exercises) => {
    let doesExist = false;
    exercises.forEach(element => {
        if (element.name === exerciseName) {
            doesExist = true;
        }
    });
    return doesExist;
}

const addExerciseToDay = (userRoutine, day, exercise, sets, reps, weight) => {
    const newExercise = {
        ...exercise,
        sets: sets,
        reps: reps,
        weight: weight
    }
    userRoutine.days[DaysOfWeek.indexOf(day)].exercises.push(newExercise);
    return userRoutine;
}

const removeExerciseFromDay = async (userRoutine, day, exercise) => {
    let didSucceed = false;
    try {
        const dayIndex = DaysOfWeek.indexOf(day);
        const exercises = userRoutine.days[dayIndex].exercises;
        for (let index = 0; index < exercises.length; index++) {
            const element = exercises[index];
            if (element.name === exercise.name) {
                exercises.splice(index, 1);  // Remove the exercise
                await Database.updateOne(
                    Routines_Collection,
                    { _id: userRoutine._id },
                    { days: userRoutine.days }
                );
                didSucceed = true;
                break;  // Exit the loop once you find the exercise
            }
        }
    } catch (error) {
        throw new Error("something went wrong deleting an exercise from the user routine!");
    }
    return didSucceed;
}
const createEmptyRoutine = (userId) => {
    let newUserRoutine = {
        _id: userId,
        days: [{
            day: DaysOfWeek[0],
            exercises: []
        },
        {
            day: DaysOfWeek[1],
            exercises: []
        },
        {
            day: DaysOfWeek[2],
            exercises: []
        },
        {
            day: DaysOfWeek[3],
            exercises: []
        },
        {
            day: DaysOfWeek[4],
            exercises: []
        },
        {
            day: DaysOfWeek[5],
            exercises: []
        },
        {
            day: DaysOfWeek[6],
            exercises: []
        },
        ]
    }
    return newUserRoutine;
}
const getUserRoutine = async (userId) => {
    let user = await Database.findOne(Routines_Collection, { _id: userId });
    if (!user) {
        user = createEmptyRoutine();
        await Database.insertOne(Routines_Collection, user);
    }
    return user;
}

async function updateWorkoutHistory(req) {
    const { userId, totalCalories, date, minutesOffset } = req.body;
    const parsedDate = new Date(date);
    const minutesDiff = parsedDate.getTimezoneOffset() - minutesOffset;
    if (minutesDiff !== 0) {
        parsedDate.setMinutes(parsedDate.getMinutes() + minutesDiff);
    }
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date provided.');
    }
    const year = parsedDate.getFullYear().toString();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    try {
        const result = await Database.db.collection(Workout_History).updateOne(
            { _id: userId },
            {
                $set: {
                    [`${Workout_History}.${year}.${month}.${day}`]: { totalCalories }
                }
            },
            { upsert: true }
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            throw new Error('No documents were updated or inserted.');
        }
        return true;
    } catch (error) {
        console.error('Error updating workout history:', error.message);
        throw error;
    }
}

async function getWorkoutHistoryForDay(userId, year, month, day) {
    try {
        const workoutHistory = await Database.findOne(Workout_History, { _id: userId });
        if (!workoutHistory) {
            return false;
        }
        const dayEntry = workoutHistory.workout_history[year]?.[month]?.[day];
        if (!dayEntry) {
            return false;
        }
        return {
            totalCalories: dayEntry.totalCalories,
        };
    } catch (error) {
        console.error('Error retrieving workout history:', error);
        throw error;
    }
}

const getWorkoutHistory = async (userId) => {
    try {
        const result = await Database.findOne(Workout_History, { _id: userId });
        if (!result) {
            throw new Error('No workout history found for this user.');
        }
        return result.workout_history;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addExerciseToRoutine, getUserRoutine, removeExerciseFromRoutine,
    updateWorkoutHistory, getWorkoutHistoryForDay, getWorkoutHistory
}