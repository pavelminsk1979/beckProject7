import nodemailer from 'nodemailer'

export const sendLetterMailUserRegistrationService={
    async sendMail(email:string){


        let transport = await nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'pavvel.potapov@gmail.com',
                pass:'cfas asrj bell izdi'
            }
        });

        let info = await transport.sendMail({
            from:'Pavel',
            to:email,
            subject:'ПОДТВЕРЖДЕНИЕ регистации',
            html:'<h1>Thank for your registration</h1>',
        })


        return email
    }
}

/*
let transport = await nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'pavvel.potapov@gmail.com',
        pass:'cfas asrj bell izdi'
    }
});

let info = await transport.sendMail({
    from:'Pavel',
    to:req.body.email,
    subject:'ПОДТВЕРЖДЕНИЕ регистации',
    html:req.body.message,
})
*/
