const Database = require('../database/my-database');
const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const { Routines_Collection } = require('../globals')
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
        await Database.updateOne(Routines_Collection, { _id: userRoutine.userId }, { days: userRoutine.days });
        return true;
    }
}


const checkExerciseInDay = (exerciseName, day, userRoutine) => {
    exerciseDoesExist = searchExercise(exerciseName, userRoutine.days[DaysOfWeek.indexOf(day)].exercises);
    return (exerciseDoesExist) ? true : false;
}

const searchExercise = (exerciseName, exercises) => {
    exercises.forEach(element => {
        if (element.name === exerciseName)
            return true
    });
    return false
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
module.exports = { addExerciseToRoutine, getUserRoutine }