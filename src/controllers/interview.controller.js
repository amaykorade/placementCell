import { InterviewModel } from "../models/interview.model.js";

export default class InterviewController {

    async getList(req, res) {
        const data = await InterviewModel.find();
        // console.log(data);
        res.render('interview', { intData: data });
    }

    getForm(req, res) {
        res.render('form');
    }

    async add(req, res) {
        const data = req.body;
        // const date = new Date(last_date);
        // const dayAndDate = date.toISOString().split('T')[0];
        // console.log(dayAndDate)
        // const data = { name, area, vacancies, dayAndDate };
        try {
            const existData = await InterviewModel.findOne({ name: data.name });
            if (!existData) {
                const newData = new InterviewModel(data);
                await newData.save();
                res.status(201).redirect('/interview')
            } else {
                res.status(500).render('form', { errorMessage: "Same data exists " })
            }
        } catch (error) {
            console.error(error);
            res.status(500).render('form', { errorMessage: "An error occurred" });
        }
    }
}