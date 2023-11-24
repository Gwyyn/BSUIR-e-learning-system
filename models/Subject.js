import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        hours: {
            type: Number
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Subject', SubjectSchema)