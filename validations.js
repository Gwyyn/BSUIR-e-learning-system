import {body} from "express-validator";

export const registerValidation = [
    body('role').custom((value) => {
        if (value !== "student" && value !== "educator" && value !== "admin") {
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
export const loginValidation = [
    body('login', "Не должно быть короче 4 символов").isLength({min: 4}),
    body('password', "Не должно быть короче 5 символов").isLength({min: 5}),
]

export const postCreateValidation = [
    body('title', "Введите заголовок статьи").isLength({min: 3}).isString(),
    body('text', "Введите текст статьи").isLength({min: 10}).isString(),
    body('tags', "Неверный формат тэгов").optional().isString(),
    body('imageUrl', "Неверная ссылка на изображение").optional().isString(),
]
