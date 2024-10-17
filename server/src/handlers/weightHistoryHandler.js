const Database = require('../database/my-database');
const { Weight_History } = require('../globals');

async function updateWeightHistory(req) {
    const { userId, weight, date, minutesOffset } = req.body;
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
        const result = await Database.db.collection(Weight_History).updateOne(
            { _id: userId },
            {
                $set: {
                    [`${Weight_History}.${year}.${month}.${day}`]: { weight }
                }
            },
            { upsert: true }
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            throw new Error('No documents were updated or inserted.');
        }
        return true;
    } catch (error) {
        console.error('Error updating weight history:', error.message);
        throw error;
    }
}

async function getWeightHistoryForDay(userId, year, month, day) {
    try {
        const weightHistory = await Database.findOne(Weight_History, { _id: userId });
        if (!weightHistory) {
            return false;
        }
        const dayEntry = weightHistory.weight_history[year]?.[month]?.[day];
        if (!dayEntry) {
            return false;
        }
        return {
            weight: dayEntry.weight,
        };
    } catch (error) {
        console.error('Error retrieving weight history:', error);
        throw error;
    }
}

const getWeightHistory = async (userId) => {
    try {
        const result = await Database.findOne(Weight_History, { _id: userId });
        if (!result) {
            throw new Error('No weight history found for this user.');
        }
        return result.weight_history;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateWeightHistory, getWeightHistoryForDay, getWeightHistory
}