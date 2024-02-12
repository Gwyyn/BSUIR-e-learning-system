import AnswerGradeModel from '../models/AnswerGrade.js'


export const getAll = async (req, res) => {
    try {
        const {userId} = req.params;
        const grades = await AnswerGradeModel.find({user: userId}).exec();

        res.json(grades);
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
        const {answerId} = req.params;
        const doc = await AnswerGradeModel.findOne(
            {
                answer: answerId,
            }
        );
        if (!doc) {
            return res.status(404).json({
                message: "Отметка не найдена",
            });
        }
        res.json(doc);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить вашу отметку",
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new AnswerGradeModel({
            user: req.body.userId,
            answer: req.body.answerId,
            lesson: req.body.lessonId,
            status: "not checked",
            grade: req.body.grade
        });

        const grade = await doc.save();

        res.json(grade)
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
        const answerGradeId = req.params.id;

        const doc = await AnswerGradeModel.updateOne({
                _id: answerGradeId,
            },
            {
                status: "checked",
                grade: req.body.grade,
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "Отметка не найдена",
            });
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить отметку",
            error: err.message
        })
    }
}
export const deleteGrade = async (req, res) => {
    try {
        const answerGradeId = req.params.id;

        const doc = await AnswerGradeModel.findOneAndDelete({
            _id: answerGradeId,
        })

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'Отметка не найдена',
            });
        }

        res.json({
            success: true,
            message: 'Отметка успешно удалена',
        });
    } catch (error) {
        console.error('Ошибка при удалении отметки', error);
        res.status(500).json({
            success: false,
            message: 'Не удалось удалить отметку',
            error: error.message,
        });
    }

}
