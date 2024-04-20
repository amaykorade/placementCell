import { StudentModel } from "../models/students.model.js";
import { InterviewModel } from "../models/interview.model.js";

export default class StudentController {
    async getStu(req, res) {
        try {
            const data = await StudentModel.find();
            res.render('students', { data: data })
        } catch (error) {
            console.log(error)
            res.status(500).render('students', { errorMessage: "An error occurred while getting the data" });
        }
    }

    async getStuReg(req, res) {
        try {
            const data = await InterviewModel.find();
            res.render('stregister', { data: data })
        } catch (err) {

        }
    }

    async getAppliedStu(req, res) {
        try {
            const name = req.query.name
            console.log(name);
            const data = await StudentModel.find({ company_name: name });
            if (data.length === 0) {
                res.render('studentsApplied', { message: "No Students applied for the company", data: data })
            } else {
                res.render('studentsApplied', { data: data, message: null })
            }
            console.log(data);

        } catch (err) {
            res.status(500).render('interview', { errorMessage: "An error occurred" });

        }
    }

    async addStd(req, res) {
        try {
            const data = req.body;
            console.log(data)
            const dataExist = await StudentModel.find({ name: data.name });
            if (dataExist.length == 0) {
                const newStd = new StudentModel(data);
                await newStd.save();
                res.status(201).redirect('/students');
            } else {
                res.status(500).render('stregister', { errorMessage: "Same data exists " })
            }
        } catch (error) {
            console.error(error);
            res.status(500).render('form', { errorMessage: "An error occurred" });
        }
    }


}