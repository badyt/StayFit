const dietHandler = require('./dietHandler');
const routineHandler = require('./routineHandler');
const { ObjectId } = require('mongodb');
const getAvgNutrients = async (userId, startDate, endDate) => {
    try {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        let workoutHistory = await routineHandler.getWorkoutHistory(userId);
        let dietHistory = await dietHandler.getDietHistory(userId);
        const startYear = parsedStartDate.getFullYear().toString();
        const startMonth = String(parsedStartDate.getMonth() + 1).padStart(2, '0');
        const startDay = String(parsedStartDate.getDate()).padStart(2, '0');
        const endYear = parsedEndDate.getFullYear().toString();
        const endMonth = String(parsedEndDate.getMonth() + 1).padStart(2, '0');
        const endDay = String(parsedEndDate.getDate()).padStart(2, '0');

        let CaloriesBurnt = 0;
        let totalCalories = 0;
        let totalProteins = 0;
        let workoutDays = 0;
        let dietDays = 0;

        for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
            // Determine the start and end months for the current year
            const startMonthLoop = year === parseInt(startYear) ? parseInt(startMonth) : 1;
            const endMonthLoop = year === parseInt(endYear) ? parseInt(endMonth) : 12;
            
            // Loop through each month in the range
            for (let month = startMonthLoop; month <= endMonthLoop; month++) {
                // Determine the start and end days for the current month
                const startDayLoop = (year === parseInt(startYear) && month === parseInt(startMonth)) ? parseInt(startDay) : 1;
                const endDayLoop = (year === parseInt(endYear) && month === parseInt(endMonth))
                    ? parseInt(endDay) // Use the endDay for the last month
                    : new Date(year, month, 0).getDate(); // Last day of the month

                // Loop through each day in the month
                for (let day = startDayLoop; day <= endDayLoop; day++) {
                    // Access the diet history for the current date
                    const dayKey = String(day).padStart(2, '0'); // Zero-pad day
                    const monthKey = String(month).padStart(2, '0'); // Zero-pad month

                    const workoutDayData = workoutHistory?.[year]?.[monthKey]?.[dayKey];
                    if (workoutDayData) {
                        CaloriesBurnt += workoutDayData.totalCalories || 0;
                        workoutDays++;
                    }
                    const dietDayData = dietHistory?.[year]?.[monthKey]?.[dayKey];
                    if (dietDayData) {
                        totalCalories += dietDayData.totalCalories || 0;
                        totalProteins += dietDayData.totalProteins || 0;
                        dietDays++;
                    }
                }
            }
        }

        // Calculate average nutrients
        const avgCaloriesBurnt = workoutDays > 0 ? CaloriesBurnt / workoutDays : 0;
        const avgCalories = dietDays > 0 ? totalCalories / dietDays : 0;
        const avgProteins = dietDays > 0 ? totalProteins / dietDays : 0;

        return {
            avgCalories,
            avgProteins,
            avgCaloriesBurnt,
            dietDays,
            workoutDays
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {getAvgNutrients}