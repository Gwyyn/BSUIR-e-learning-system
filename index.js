import express from 'express';
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors'

import {loginValidation, postCreateValidation, registerValidation, subjectCreateValidation} from "./validations.js";

import {handleValidationErrors, checkAuth} from "./utils/index.js";

import {PostController, UserController, SubjectController} from './controllers/index.js'

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.hexfqfb.mongodb.net/BSUIR?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'uploads');
        } else {
            cb(null, 'uploads/files');
        }
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('file'), (req, res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, postCreateValidation, handleValidationErrors, PostController.update);



app.get('/subject-tags', SubjectController.getLastTags)
app.get('/subjects/tags', SubjectController.getLastTags)
app.get('/subjects', SubjectController.getAll)
app.get('/subjects/:id', SubjectController.getOne)
app.post('/subjects', checkAuth, subjectCreateValidation, handleValidationErrors, SubjectController.create)
app.delete('/subjects/:id', checkAuth, SubjectController.remove)
app.patch('/subjects/:id', checkAuth, subjectCreateValidation, handleValidationErrors, SubjectController.update)






app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK')
})