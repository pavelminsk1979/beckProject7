import {postsCollection, usersCollection} from "../../db/mongoDb";
import {User} from "../../allTypes/userTypes";
import {ObjectId} from "mongodb";


export const usersRepository={

    async createUser(newUser: User) {

        const result = await usersCollection.insertOne(newUser)
        return result
    },

    async deleteUserById(id:string):Promise<boolean> {

        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})

        return !!result.deletedCount
    },

    async findUserByConfirmationCode (code:string){
        return usersCollection.findOne({
            "emailConfirmation.confirmationCode":code
        })
    },

    async updateValueIsConfirmedForUser(code:string){

        const result = await usersCollection.updateOne({"emailConfirmation.confirmationCode": code}, {
            $set: {"emailConfirmation.isConfirmed":true}
        })

        return !!result.matchedCount

    }

}