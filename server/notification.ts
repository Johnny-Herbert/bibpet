import * as nodemailer from "nodemailer";

export class Notification{
    sendEmail(to: string[], subject: string, message: string){
        let smtpConfig = {
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'ed738244c7356c',
                pass: '7331abfbf99a11'
            }
        };

        let mailOptions = {
            from: 'naoresponda@bibpet.cin.ufpe.br',
            to: to,
            subject: subject,
            html: message
        };
        var transport = nodemailer.createTransport(smtpConfig);
        transport.sendMail(mailOptions, function(err, info){
            if(err){
                return err.message
            }
            else{
                return info
            }
        })
    }
}