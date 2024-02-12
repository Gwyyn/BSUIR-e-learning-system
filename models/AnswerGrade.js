import mongoose from "mongoose";

const AnswerGradeSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        answer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
            required: true,
        },
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
        },
        status: {
            type: String,
            enum: ["not checked", "checked"],
            required: true,
        },
        grade: {
            type: Number,
            min: 0,
            max: 10,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} должно быть целым числом",
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('AnswerGrade', AnswerGradeSchema)