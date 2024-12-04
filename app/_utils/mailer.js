import nodemailer from 'nodemailer'
// const nodemailer = require("nodemailer")

export async function sendMail({ email, emailType, userId }) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOptions = {
            from: 'maddison53@ethereal.email',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email using this token" : "Reset your password",// Subject line
            html: "<b>Hello world?</b>",
        }

        const mailResponse = transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        throw new Error(error.message)
    }

}