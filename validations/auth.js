import {body} from "express-validator";

export const registerValidation = [
    body('role').custom((value) => {
        if (value !== "Студент" && value !== "Преподаватель") {
            throw new Error("Недопустимое значение для роли");
        }
        return true;
    }),
    body('firstName', "Не должно быть короче 2 символов").isLength({min: 2}),
    body('lastName', "Не должно быть короче 2 символов").isLength({min: 2}),
    body('login', "Не должно быть короче 4 символов").isLength({min: 4}),
    body('password', "Не должно быть короче 5 символов").isLength({min: 5}),
    body('avatarUrl').optional().isURL(),
]