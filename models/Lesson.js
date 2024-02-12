import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        file_path: {
            type: Array,
            default: [],
        },
        type: {
            type: String,
            enum: ["PZ", "LR", "LK", "KR"],
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Lesson', LessonSchema)