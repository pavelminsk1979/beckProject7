import nodemailer from 'nodemailer'



export const emailAdapter={
    async sendEmail(email:string){
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


        return !!info
    }
}