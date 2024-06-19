import express from 'express';
import dotenv from 'dotenv';
// import jwtAuth from './features/middlewares/jwt.middleware.js';
import { connectUsingMongoose } from './config/mongoose.config.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import ejsLayouts from 'express-ejs-layouts'
import { auth } from './src/middlewares/auth.middleware.js';

// import controllers
import UserController from './src/controllers/user.controller.js';
import InterviewController from './src/controllers/interview.controller.js';
import StudentController from './src/controllers/students.controller.js';
import CsvController from './src/controllers/download.csv.controller.js';

const server = express();

dotenv.config();

server.use(express.json());
server.use(cookieParser());
// parse form data
server.use(express.urlencoded({ extended: true }));

// config sessions
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))

// set EJS as the view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts)

// user
const userController = new UserController();
server.get('/register', userController.getRegister);
server.post('/register', userController.postRegister);

server.get('/login', userController.getLogin);
server.post('/login', userController.postLogin);

// interview
const interviewController = new InterviewController();
server.get('/interview', auth, interviewController.getList);
server.get('/form', auth, interviewController.getForm);
server.post('/form', auth, interviewController.add);


// students
const studentController = new StudentController();
server.get('/students', auth, studentController.getStu);
server.get('/stregister', auth, studentController.getStuReg);
server.get('/studentsApplied', auth, studentController.getAppliedStu);

server.post('/stregister', auth, studentController.addStd);
server.get('/logout', userController.logout);

// csv
const csvController = new CsvController()
server.get('/download-csv', csvController.downloadCsv);

server.listen(3000, () => {
    console.log('Server is running on port 3000');

    connectUsingMongoose();
});

// mongodb atlas keys for Placement
// username - amaykorade
// password - ICTgBgT5iDoRhYBT
// string - mongodb+srv://amaykorade:ICTgBgT5iDoRhYBT@placement.vxucwnw.mongodb.net/?retryWrites=true&w=majority&appName=Placement