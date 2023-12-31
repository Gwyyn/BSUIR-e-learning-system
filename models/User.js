import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        role: {
            type: String,
            enum: ["Студент", "Преподаватель"],
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true
        },
        avatarUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema)