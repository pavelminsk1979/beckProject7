
import {MongoClient} from  'mongodb'
import dotenv from 'dotenv'
import {Blog} from "../allTypes/blogTypes";
import {Post} from "../allTypes/postTypes";
import {User} from "../allTypes/userTypes";
import {Comment} from "../allTypes/commentTypes";

export const port = 3000


dotenv.config()

export const appConfigSettings = {
    mongoUrl:process.env.MONGO_URL as string,
}


export const mongoDb = {
    client: new MongoClient(appConfigSettings.mongoUrl),
    async runDb(){
        try{
            console.log('connection',appConfigSettings.mongoUrl)
            await this.client.connect();
            //console.log(this.client)
            console.log('Connected successful with mongoDB')

        }catch (e) {
            console.log(e +'Connected ERROR with mongoDB')
            await this.client.close()
        }
    }
}

const db=mongoDb.client.db('projectHW')

export const postsCollection=db.collection<Post>('posts')

export const blogsCollection=db.collection<Blog>('blogs')

export const usersCollection=db.collection<User>('users')

export const commentsCollection=db.collection<Comment>('comments')




























/*
import {MongoClient} from  'mongodb'
import dotenv from 'dotenv'
import {Blog} from "../allTypes/blogTypes";
import {Post} from "../allTypes/postTypes";
import {User} from "../allTypes/userTypes";
import {Comment} from "../allTypes/commentTypes";

export const port = 3000


dotenv.config()


const mongoUri = process.env.MONGO_URL;
if(!mongoUri){

    throw new Error('URL not find(file mongoDb.ts:14')
}

 const client = new MongoClient(mongoUri)

const db=client.db('projectHW')

export const postsCollection=db.collection<Post>('posts')

export const blogsCollection=db.collection<Blog>('blogs')

export const usersCollection=db.collection<User>('users')

export const commentsCollection=db.collection<Comment>('comments')

export async function runDb(){
    try {
        await client.connect()
        console.log('Connected successful with mongoDB')
    }catch (e) {
        console.log(e +'Connected ERROR with mongoDB')
        await client.close()

    }
}*/
