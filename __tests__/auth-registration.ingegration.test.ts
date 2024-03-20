import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {authService} from "../src/servisces/auth-service";
import {createItemsForTest} from "./utils/createItemsForTest";
import {ObjectId} from "mongodb";
import {emailAdapter} from "../src/adapters/emailAdapter";


const  req = supertest(app)

describe('user registration',()=>{

    beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })

const registerUserMethod = authService.registerUser;

    emailAdapter.sendEmail=jest.fn().mockImplementation((email,confirmationCode)=>{return true})

    it("rigistration newUser with correct data",async ()=>{
        const {login,email,password}=createItemsForTest.createOneItem()

        const result = await registerUserMethod(login,email,password)

        console.log(result)

        expect(result).toEqual({
            login,
            email,
            passwordHash:expect.any(String),
            createdAt:expect.any(Date),
            emailConfirmation:{
                confirmationCode:expect.any(String),
                expirationDate:expect.any(Date),
                isConfirmed:false
            },
            _id: expect.any(ObjectId)
        })
    })



})


/*
{
    login: '3363337',
        email: 'pavelminsk1979@mail.ru',
    passwordHash: '$2b$10$ptO1xPGhw1vmKfou60R5uOJ.N/whdc2w0yJKP7D06jw3eUxfjAUTC',
    createdAt: 2024-03-20T01:18:50.657Z,
    emailConfirmation: {
    confirmationCode: 'a78cfa92-66af-4101-aeeb-9dcd057d7e1f',
        expirationDate: 2024-03-20T02:20:50.658Z,
        isConfirmed: false
},
    _id: new ObjectId('65fa397a4e8b5656489993bd')
}*/
