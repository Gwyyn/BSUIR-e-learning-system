import AnswerModel from '../models/Answer.js'

export const getAll = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const answers = await AnswerModel.find({ lesson: lessonId }).exec();

        res.json(answers);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить ответы",
            error: err.message
        });
    }
}
export const getAllByTypeLesson = async (req, res) => {
    try {
        const { userId, lessonId } = req.params;
        const answers = await AnswerModel.find({ user: userId, lesson: lessonId }).exec();

        res.json(answers);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить ответы",
            error: err.message
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const {answerId, userId} = req.params;
        const doc = await AnswerModel.findOne(
            {
                _id: answerId,
                user: userId
            }
        );
        if (!doc) {
            return res.status(404).json({
                message: "Ответ не найден",
            });
        }
        res.json(doc);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить ваш ответ",
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new AnswerModel({
            user: req.body.id,
            lesson: req.body.lessonId,
            answer: req.body.answer,
        });

        const answer = await doc.save();

        res.json(answer)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось отправить ответ",
            error: err.message
        })
    }
}
export const update = async (req, res) => {
    try {
        const answerId = req.params.id;

        const doc = await AnswerModel.updateOne({
                _id: answerId,
            },
            {
                answer: req.body.answer,
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "Ответ не найден",
            });
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить ответ",
            error: err.message
        })
    }
}
export const deleteAnswer = async (req, res) => {
    try {
        const answerId = req.params.id;

        const doc = await AnswerModel.findOneAndDelete({
            _id: answerId,
        })

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'Ответ не найден',
            });
        }

        res.json({
            success: true,
            message: 'Ответ успешно удален',
        });
    } catch (error) {
        console.error('Ошибка при удалении ответа', error);
        res.status(500).json({
            success: false,
            message: 'Не удалось удалить ответ',
            error: error.message,
        });
    }

}


// export const getByType = async (req, res) => {
//     try {
//         const lesson = await LessonModel.find({ type: req.params.type, subject: req.subjectId });
//         res.json(lesson);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: "Не удалось загрузить задания",
//             error: err.message
//         });
//     }
// };

// export const getOne = async (req, res) => {
//     try {
//         const lessonId = req.params.id;
//
//         const doc = await LessonModel.findOneAndUpdate(
//             {
//                 _id: lessonId,
//             },
//             {
//                 returnDocument: "after",
//             },
//         ).populate('subject');
//         if (!doc) {
//             return res.status(404).json({
//                 message: "Задание не найдено",
//             });
//         }
//         res.json(doc);
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: "Не удалось получить задание",
//             error: err.message
//         })
//     }
// }

// export const deleteType = async (req, res) => {
//     try {
//         const {subjectId} = req.params;
//         const lessonTypeToDelete = req.query.type;
//
//         const doc = await AnswerModel.findOneAndDelete({
//             subject: subjectId,
//             type: lessonTypeToDelete
//         })
//
//         if (!doc) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Занятие не найдено',
//             });
//         }
//         res.json({
//             success: true,
//             message: 'Тип занятия успешно удален',
//         });
//     } catch (error) {
//         console.error('Ошибка при удалении типа занятия', error);
//         res.status(500).json({
//             success: false,
//             message: 'Не удалось удалить тип занятия',
//             error: error.message,
//         });
//     }
// };

