import fs from 'fs';
import { parse } from 'json2csv';
import { StudentModel } from '../models/students.model.js';

export default class CsvController {

    async downloadCsv(req, res) {
        try {
            const data = await StudentModel.find();

            // convert data to csv format
            const csv = parse(data);

            res.setHeader('Content-disposition', 'attachment; filename=student.data.csv');
            res.set('Content-Type', 'text/csv');

            res.status(200).send(csv)

        } catch (error) {
            console.error('Error generating CSV:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}