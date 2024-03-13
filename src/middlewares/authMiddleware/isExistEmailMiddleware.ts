import {RequestWithBody} from "../../allTypes/RequestWithBody";
import {AuthRegistrationModel} from "../../allTypes/authTypes";
import {NextFunction, Response} from "express";
import {userQueryRepository} from "../../repositories/users/user-query-repository";
import {STATUS_CODE} from "../../common/constant-status-code";




export const isExistEmailMiddleware= async (req: RequestWithBody<AuthRegistrationModel>, res: Response, next: NextFunction) => {

    const email = req.body.email.trim()

    const user= await userQueryRepository.findUserByLoginOrEmail(email)

    if(user){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST_400)

    } else {
        return  next()
    }

}