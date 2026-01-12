import { Request, Response } from "express"
import { EmailDoesNotExist, loginUserService, PasswordDoesNotMatch } from "../../services/login/login.service";
import Joi from "joi";

export const loginController = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const data = await loginUserService(body);
        res.status(200).json({ data: { ...data }, error: null });
    } catch (error) {
        console.error("Ocurred an error log in this user: ", error);
        const myError = error as Joi.ValidationError;

        if (myError.isJoi) {
            res.status(400).json({
                error: myError.details[0].message
            });
            return;
        }

        if (error instanceof EmailDoesNotExist) {
            res.status(401).json({
                error: error.message
            });
            return;
        }

        if (error instanceof PasswordDoesNotMatch) {
            res.status(401).json({
                error: error.message
            });
            return;
        }

        res.status(500).json({
            error
        })
    }
}