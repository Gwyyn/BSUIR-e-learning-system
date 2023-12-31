import express from 'express';
import mongoose from "mongoose";

import {registerValidation} from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js"

import * as  UserController from './controllers/UserController.js'

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.hexfqfb.mongodb.net/BSUIR?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json())

app.post('/auth/login', UserController.login)
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK')
})