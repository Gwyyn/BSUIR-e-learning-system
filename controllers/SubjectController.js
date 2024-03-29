import SubjectModel from '../models/Subject.js'

export const getLastTags = async (req, res) => {
    try {
        const subjects = await SubjectModel.find().limit(5).exec();

        const tags = subjects
            .map(obj => obj.tags)
            .flat()
            .slice(0, 5)

        res.json(tags);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить тэги",
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const subjects = await SubjectModel.find().populate('user').exec();

        res.json(subjects);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить учебные дисциплины",
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const {id} = req.params;

        const doc = await SubjectModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                returnDocument: "after",
            },
        ).populate('user');
        if (!doc) {
            return res.status(404).json({
                message: "Учебная дисциплина не найдена",
            });
        }
        res.json(doc);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить учебную дисциплину",
        })
    }
}

export const remove = async (req, res) => {
    try {
        const subjectId = req.params.id;

        const doc = await SubjectModel.findOneAndDelete({
            _id: subjectId,
        })

        if (!doc) {
            return res.status(404).json({
                message: "Учебная дисциплина не найдена",
            });
        }
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось удалить учебную дисциплину",
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new SubjectModel({
            title: req.body.title,
            text: req.body.text,
            hours: req.body.hours,
            fileUrl: req.body.fileUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const subject = await doc.save();

        res.json(subject)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать учебную дисциплину",
        })
    }
}

export const update = async (req, res) => {
    try {
        const subjectId = req.params.id;

        const doc = await SubjectModel.updateOne({
                _id: subjectId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                hours: req.body.hours,
                fileUrl: req.body.fileUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "Учебная дисциплина не найдена",
            });
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить учебную дисциплину",
        })
    }
}