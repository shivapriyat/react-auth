import nodemailer from "nodemailer";

export const sendEmail=({to,from,subject,text})=> {

    console.log("to"+ to);
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "SENDER_GMAIL_ID", //https://support.google.com/mail/answer/185833?hl=en to set up app pwd.
            pass: "SENDER_GMAIL_PASS_KEY_SETUP"
        }
    });
    let mailOptions = {
        "to": to,
        "from": from,
        "subject": subject,
        "text": text
    };


    transport.sendMail(mailOptions, (err,info) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    })
}