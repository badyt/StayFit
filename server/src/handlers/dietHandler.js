const Database = require('../database/my-database');
const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const { Diets_Collection } = require('../globals')

const addMealToDiet = async (req) => {
    const { userId, day, meal } = req.body;
    let userRoutine = await Database.findOne(Diets_Collection, { _id: userId });
    if (!userRoutine) {
        userRoutine = createEmptyDiet(userId);
        userRoutine = addMealToDay(userRoutine, day, meal);
        await Database.insertOne(Diets_Collection, userRoutine);
        return true;
    }
    else {
        userRoutine = addMealToDay(userRoutine, day, meal);
        await Database.updateOne(Diets_Collection, { _id: userId }, { days: userRoutine.days });
        return true;
    }
}

const removeMealFromDiet = async (req) => {
    const { userId, day, meal } = req.body;
    didRemove = false;
    let userRoutine = await Database.findOne(Diets_Collection, { _id: userId });
    if (!userRoutine) {
        throw new Error(`Error finding user routine`);
    } else {
        didRemove = await removeMealFromDay(userRoutine, day, meal);
    }
    return didRemove;
}

const addMealToDay = (userRoutine, day, meal) => {
    const dayIndex = DaysOfWeek.indexOf(day);
    userRoutine.days[dayIndex].meals.push(meal);
    
    // Sort meals by time
    userRoutine.days[dayIndex].meals.sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    return userRoutine;
};

const removeMealFromDay = async (userRoutine, day, meal) => {
    let didSucceed = false;
    try {
        const dayIndex = DaysOfWeek.indexOf(day);
        const meals = userRoutine.days[dayIndex].meals;
        for (let index = 0; index < meals.length; index++) {
            const element = meals[index];
            if (element.food.name === meal.food.name) {
                meals.splice(index, 1);  // Remove the exercise
                await Database.updateOne(
                    Diets_Collection,
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
const createEmptyDiet = (userId) => {
    let newUserDiet = {
        _id: userId,
        days: [{
            day: DaysOfWeek[0],
            meals: []
        },
        {
            day: DaysOfWeek[1],
            meals: []
        },
        {
            day: DaysOfWeek[2],
            meals: []
        },
        {
            day: DaysOfWeek[3],
            meals: []
        },
        {
            day: DaysOfWeek[4],
            meals: []
        },
        {
            day: DaysOfWeek[5],
            meals: []
        },
        {
            day: DaysOfWeek[6],
            meals: []
        },
        ]
    }
    return newUserDiet;
}

const getUserDiet = async (userId) => {
    let user = await Database.findOne(Diets_Collection, { _id: userId });
    if (!user) {
        user = createEmptyDiet();
        await Database.insertOne(Diets_Collection, user);
    }
    return user;
}
module.exports = { addMealToDiet, getUserDiet, removeMealFromDiet }