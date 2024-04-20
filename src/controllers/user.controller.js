import { UserModel } from "../models/user.model.js"
import { InterviewModel } from "../models/interview.model.js";
import jwt from 'jsonwebtoken';

export default class UserController {


    getRegister(req, res) {
        res.render('signup')
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null, userEmail: req.session.userEmail })
    }

    async postRegister(req, res) {
        try {
            const user = req.body;
            const existingUser = await UserModel.findOne({ email: user.email });
            if (!existingUser) {
                const newUser = new UserModel(user);
                await newUser.save();
                res.status(201).render('login', { errorMessage: null, userEmail: req.session.userEmail })
            } else {
                res.status(400).render('login', { errorMessage: 'User with same credentials exist' })
            }

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async postLogin(req, res) {
        try {
            const { email, password } = req.body
            const user = await UserModel.findOne({ email, password });
            if (!user) {
                res.status(201).render('login', { message: 'Invalid credentials', userEmail: req.session.userEmail })
            }
            req.session.userEmail = email;
            let data = await InterviewModel.find()
            res.render('interview', { intData: data, userEmail: req.session.userEmail })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');
            }
        })
        res.clearCookie('lastVisit');
    }
}