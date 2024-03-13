import {NextFunction, Response} from "express";
import {STATUS_CODE} from "../../common/constant-status-code";
import {userQueryRepository} from "../../repositories/users/user-query-repository";
import {RequestWithBody} from "../../allTypes/RequestWithBody";
import {AuthRegistrationModel} from "../../allTypes/authTypes";




export const isExistLoginMiddleware= async (req: RequestWithBody<AuthRegistrationModel>, res: Response, next: NextFunction) => {

    const login = req.body.login.trim()

    const user= await userQueryRepository.findUserByLoginOrEmail(login)

    if(user){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST_400)

    } else {
        return  next()
    }

}