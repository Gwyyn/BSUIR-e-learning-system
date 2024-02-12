import express from 'express';
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors'

import {loginValidation, postCreateValidation, registerValidation, subjectCreateValidation} from "./validations.js";

import {handleValidationErrors, checkAuth} from "./utils/index.js";

import {
    PostController,
    UserController,
    SubjectController,
    LessonController,
    AnswerController,
    AnswerGradeController
} from './controllers/index.js'

mongoose
    .connect('mongodb+srv://admin:admin1@cluster1.5mijtlj.mongodb.net/BSUIR?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))

const app = express();
let pathFile = '/uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'uploads');
            pathFile = '/uploads/';
        } else {
            cb(null, 'uploads/files');
            pathFile = '/uploads/files/'
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

app.get('/user/:userId', checkAuth, UserController.getUserById);

app.post('/upload', checkAuth, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: 'No file uploaded.'});
    }
    res.json({
        url: `${pathFile}${req.file.originalname}`,
    })
})


app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);


app.get('/lessons/findByLessonId/:id', LessonController.findByLessonId);
app.get('/lessons/getAllBySubjectId/:subjectId', LessonController.getAllBySubjectId);
app.get(`/lesson/:subjectId/getLessonId`, LessonController.findLessonId);
// app.get('/lesson/:type', checkAuth, LessonController.getByType);
app.post('/lessons', checkAuth, handleValidationErrors, LessonController.create);
app.patch('/lesson/:id', checkAuth, handleValidationErrors, LessonController.update);
app.delete('/lesson/:id/delete-file', checkAuth, handleValidationErrors, LessonController.deleteFile);
app.delete('/lesson/:subjectId/delete-type', checkAuth, handleValidationErrors, LessonController.deleteType);



app.get('/answers/:lessonId', AnswerController.getAll);
app.get('/answers/:userId/:lessonId', AnswerController.getAllByTypeLesson);
app.get('/answers/get-answer/:userId/:answerId', AnswerController.getOne)
app.post('/answers', checkAuth, handleValidationErrors, AnswerController.create);
app.patch('/answers/:id', checkAuth, handleValidationErrors, AnswerController.update);
app.delete('/answers/:id', checkAuth, handleValidationErrors, AnswerController.deleteAnswer);



app.get('/grades/:userId', AnswerGradeController.getAll);
app.get('/grades/get-grade/:answerId', AnswerGradeController.getOne);
app.post('/grades', checkAuth, handleValidationErrors, AnswerGradeController.create);
app.patch('/grades/:id', checkAuth, handleValidationErrors, AnswerGradeController.update);
app.delete('/grades/:id', checkAuth, handleValidationErrors, AnswerGradeController.deleteGrade);



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