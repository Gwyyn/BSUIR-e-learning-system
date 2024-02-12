import LessonModel from '../models/Lesson.js'


export const getAllBySubjectId = async (req, res) => {
    try {
        const { subjectId } = req.params;

        const lessons = await LessonModel.find({ subject: subjectId }).exec();

        res.json(lessons);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить задания",
            error: err.message
        });
    }
}
export const findByLessonId = async (req, res) => {
    try {
        const id = req.params.id;

        const lesson = await LessonModel.find({ _id: id }).exec();

        res.json(lesson);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить задание",
            error: err.message
        });
    }
}

export const findLessonId = async (req, res)  => {
    const { subjectId } = req.params;
    const { type } = req.query;
    try {
        const lesson = await LessonModel.findOne({ subject: subjectId, type: type });
        if (lesson) {
            res.json(lesson);
        } else {
            res.status(404).json({ message: 'Занятие не найдено' });
        }
    } catch (error) {
        console.error('Ошибка при поиске занятия:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

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


export const create = async (req, res) => {
    try {
        const doc = new LessonModel({
            subject: req.body.subjectId,
            file_path: req.body.file_path,
            type: req.body.type,
        });

        const lesson = await doc.save();

        res.json(lesson)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать задание",
            error: err.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const lessonId = req.params.id;

        const doc = await LessonModel.updateOne({
                _id: lessonId,
            },
            {
                // subject: req.body.subjectId,
                $push: { file_path: req.body.file_path },
                // type: req.body.type,
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "задание не найдено",
            });
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить задание",
            error: err.message
        })
    }
}
export const deleteFile = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const filePathToDelete = req.body.filePath;

        // Находим занятие по ID и обновляете массив file_path
        const updatedLesson = await LessonModel.findByIdAndUpdate(
            lessonId,
            { $pull: { file_path: filePathToDelete } },
            { new: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({
                success: false,
                message: 'Занятие не найдено',
            });
        }

        res.json({
            success: true,
            message: 'Файл успешно удален',
        });
    } catch (error) {
        console.error('Ошибка при удалении файла', error);
        res.status(500).json({
            success: false,
            message: 'Не удалось удалить файл',
            error: error.message,
        });
    }

}

export const deleteType = async (req, res) => {
    try {
        const {subjectId} = req.params;
        const lessonTypeToDelete = req.query.type;

        const doc = await LessonModel.findOneAndDelete({
            subject: subjectId,
            type: lessonTypeToDelete
        })

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'Занятие не найдено',
            });
        }
        res.json({
            success: true,
            message: 'Тип занятия успешно удален',
        });
    } catch (error) {
        console.error('Ошибка при удалении типа занятия', error);
        res.status(500).json({
            success: false,
            message: 'Не удалось удалить тип занятия',
            error: error.message,
        });
    }
};

