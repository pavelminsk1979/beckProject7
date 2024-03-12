import {NextFunction, Response} from "express";
import {STATUS_CODE} from "../../common/constant-status-code";
import {tokenJwtServise} from "../../servisces/token-jwt-service";
import {userQueryRepository} from "../../repositories/users/user-query-repository";


export const authTokenMiddleware = async (req: any, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return res.send(STATUS_CODE.UNAUTHORIZED_401)
    }

    const token = req.headers.authorization.split(' ')[1]
    //'bearer lkdjflksdfjlj889765akljfklaj'

    const userId = await tokenJwtServise.getUserIdByToken(token)

    if (userId) {

        const user = await userQueryRepository.findUserById(userId)

        if(!user)return res.sendStatus(STATUS_CODE.UNAUTHORIZED_401)

        req.userIdLoginEmail = user

        return next()

    } else {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED_401)
    }
}



