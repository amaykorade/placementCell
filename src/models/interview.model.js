import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    name: {
        type: String
    },
    area: {
        type: String
    },
    vacancies: {
        type: Number
    },
    dayAndDate: {
        type: Date
    }
}, {
    timestamps: true
});

export const InterviewModel = mongoose.model('Interview', interviewSchema);