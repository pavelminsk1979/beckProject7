import {body} from "express-validator";
import {userQueryRepository} from "../../repositories/users/user-query-repository";


export const isExistLoginValidator = body('login')
    .trim()
    .custom(async (login) => {
        debugger
        const user= await userQueryRepository.findUserByLoginOrEmail(login)

        if(user){
            throw new Error('Incorrect login');
        }

        return  true

    })
    .withMessage('Incorrect login')