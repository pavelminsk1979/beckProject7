import {Response, Router} from "express";
import {RequestWithBody} from "../allTypes/RequestWithBody";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {STATUS_CODE} from "../common/constant-status-code";
import {loginAndEmailValidationAuth} from "../middlewares/authMiddleware/loginAndEmailValidationAuth";
import {passwordValidationAuth} from "../middlewares/authMiddleware/passwordValidationAuth";
import {AuthModel, AuthRegistrationModel} from "../allTypes/authTypes";
import {authService} from "../servisces/auth-service";
import {tokenJwtServise} from "../servisces/token-jwt-service";
import {authTokenMiddleware} from "../middlewares/authMiddleware/authTokenMiddleware";
import {userMaperForMeRequest} from "../mapers/userMaperForMeRequest";
import {loginValidationUsers} from "../middlewares/usersMiddlewares/loginValidationUsers";
import {passwordValidationUsers} from "../middlewares/usersMiddlewares/passwordValidationUsers";
import {emailValidationUsers} from "../middlewares/usersMiddlewares/emailValidationUsers";
import {isExistLoginMiddleware} from "../middlewares/authMiddleware/isExistLoginMiddleware";
import {isExistEmailMiddleware} from "../middlewares/authMiddleware/isExistEmailMiddleware";
import {sendLetterMailUserRegistrationService} from "../servisces/send-letter-mail-user-registration-service";


export const authRoute = Router({})

const postValidationAuth = () => [loginAndEmailValidationAuth, passwordValidationAuth]

const postValidationForRegistration = () => [loginValidationUsers, passwordValidationUsers, emailValidationUsers]


authRoute.post('/login', postValidationAuth(), errorValidationBlogs, async (req: RequestWithBody<AuthModel>, res: Response) => {
    try {

        const idUser = await authService.findUserInDataBase(req.body)

        if (idUser) {

            const token = await tokenJwtServise.createTokenJwt(idUser)
            const answer = {"accessToken": token}

            res.status(STATUS_CODE.SUCCESS_200).send(answer)

        } else {
            res.sendStatus(STATUS_CODE.UNAUTHORIZED_401)
        }

    } catch (error) {
        console.log('auth-routes.ts /login' + error)
    }
})


authRoute.get('/me', authTokenMiddleware, (req: any, res: Response) => {
    try {

        const userModel = userMaperForMeRequest(req.userIdLoginEmail)
        res.status(STATUS_CODE.SUCCESS_200).send(userModel)

    } catch (error) {
        console.log(' FIlE auth-routes.ts /me' + error)
    }
})


authRoute.post('/registration', postValidationForRegistration(), errorValidationBlogs, isExistLoginMiddleware, isExistEmailMiddleware, (req: RequestWithBody<AuthRegistrationModel>, res: Response) => {
    try {

        const newUser= authService.registerUser(req.body.login,req.body.email,req.body.password)


    } catch (error) {
        console.log(' FIlE auth-routes.ts /registration' + error)
        //return res.sendStatus(STATUS_CODE.SERVER_ERROR_500)
        res.sendStatus(STATUS_CODE.SERVER_ERROR_500)
    }
})


authRoute.post('/s',async(req: any, res: any) => {
    const result = await sendLetterMailUserRegistrationService.sendMail(req.body.email)


    return  res.status(STATUS_CODE.SUCCESS_200).send(result)
})

