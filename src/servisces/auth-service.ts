import {AuthModel} from "../allTypes/authTypes";
import {userQueryRepository} from "../repositories/users/user-query-repository";
import {hashPasswordService} from "./hash-password-service";


export const authService = {

    async findUserInDataBase(requestBody:AuthModel){

        const {loginOrEmail,password}=requestBody

        const user = await userQueryRepository.findUserByLoginOrEmail(loginOrEmail)

        if(!user) return null

        const passwordHashFromExistUser=user.passwordHash

        const isCorrectPasword = await hashPasswordService.checkPassword(password,passwordHashFromExistUser)


        if(!isCorrectPasword) return null

        return user._id.toString()

    }
}