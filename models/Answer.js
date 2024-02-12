import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
        },
        answer: {
            type: Object,
            required: true,
            default: {},
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Answer', AnswerSchema)