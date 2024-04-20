import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    college_name: {
        type: String
    },
    status: {
        type: String
    },
    dsa_score: {
        type: Number
    },
    webd_score: {
        type: Number
    },
    react_score: {
        type: Number
    },
    company_name: {
        type: String
    },
    interview_date: {
        type: Date
    },
    result: {
        type: String
    }
})

export const StudentModel = mongoose.model('Students', studentSchema);