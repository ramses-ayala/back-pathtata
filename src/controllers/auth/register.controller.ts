import { Request, Response } from "express"
import { EmailAlreadyExistsError, registerUserService } from "../../services/register/register.service";
import Joi from "joi";

export const registerController = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const registeredUser = await registerUserService(body);
        res.status(201).json({ "data": registeredUser, error: null });
    } catch (error) {
        console.error("Ocurred an error signing up this user: ", error);

        const myError = error as Joi.ValidationError;

        if (myError.isJoi) {
            res.status(400).json({
                error: myError.details[0].message
            });
            return;
        }

        if(error instanceof EmailAlreadyExistsError) {
            res.status(409).json({
                error: error.message
            });
            return;
        }
        res.status(500).json({
            error
        });
    }
}