import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/common/constant-status-code";


const  req = supertest(app)

describe('/auth',()=>{

 /*   beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })*/




    const loginNewUser ='3363337'
    const passwordNewUser ='11111pasw'
    const emailNewUser ='pvink1979@mail.ru'

    it("rigistration newUser",async ()=>{
        const res =await req
            .post('/auth/registration')
            .send({ login: loginNewUser,
                password: passwordNewUser,
                email:emailNewUser})
            .expect(STATUS_CODE.NO_CONTENT_204)

            console.log(res.body)
    })


    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    it('get users',async ()=>{
        const res = await req
            .get('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        console.log(res.body.items)

    })

})