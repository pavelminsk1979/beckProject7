import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/common/constant-status-code";


const  req = supertest(app)

describe('/auth',()=>{

  /*  beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })*/




    const loginNewUser ='3363337'
    const passwordNewUser ='11111pasw'
    const emailNewUser ='pavelminsk1979@mail.ru'

 /*   it("rigistration newUser",async ()=>{
        const res =await req
            .post('/auth/registration')
            .send({ login: loginNewUser,
                password: passwordNewUser,
                email:emailNewUser})
            .expect(STATUS_CODE.NO_CONTENT_204)

            console.log(res.body)
    })*/


    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    it('get users',async ()=>{
        const res = await req
            .get('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        console.log(res.body.items)

    })


    it(" should return error ,  rigistration newUser, login and email already exist ",async ()=>{
        const res =await req
            .post('/auth/registration')
            .send({ login: loginNewUser,
                password: passwordNewUser,
                email:emailNewUser})
            .expect(STATUS_CODE.BAD_REQUEST_400)



        expect(res.body).toEqual({  errorsMessages: [
                { message: 'Incorrect login', field: 'login' },
                { message: 'Incorrect email', field: 'email' }
            ]})
    })

  /*  it(" confirm registration",async ()=>{
        const res =await req
            .post('/auth/registration-confirmation')
            .send({ code: '53f13d12-c3b3-4318-a0aa-aff15eef3232'})
            .expect(STATUS_CODE.NO_CONTENT_204)
        console.log(res.body)
    })*/

})


