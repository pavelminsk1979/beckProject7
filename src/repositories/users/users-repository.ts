import {usersCollection} from "../../db/mongoDb";
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
    }

}