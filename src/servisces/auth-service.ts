import {AuthModel} from "../allTypes/authTypes";
import {userQueryRepository} from "../repositories/users/user-query-repository";
import {hashPasswordService} from "./hash-password-service";
import {usersRepository} from "../repositories/users/users-repository";


export const authService = {

    async registerUser(login:string,email:string,password:string){

        const passwordHash = await hashPasswordService.generateHash(password)

        const newUser={
            login,
            email,
            passwordHash,
            createdAt: new Date(),
         /*   emailConfirmation:{
                confirmationCode:xxx,
                expirationDate: add(new Date(),{hours:1,minutes:2}),
                isConfirmed:false
            }*/
        };

        await usersRepository.createUser(newUser)


    },



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