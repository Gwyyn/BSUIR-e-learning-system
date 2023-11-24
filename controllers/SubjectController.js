import SubjectModel from '../models/Subject.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await SubjectModel.find().limit(5).exec();

        const tags = posts
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
        const posts = await SubjectModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить учебные дисциплины",
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await SubjectModel.findOneAndUpdate(
            {
                _id: postId,
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
        const postId = req.params.id;

        const doc = await SubjectModel.findOneAndDelete({
            _id: postId,
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

        const post = await doc.save();

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать учебную дисциплину",
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await SubjectModel.updateOne({
                _id: postId,
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