import nodemailer from 'nodemailer'
import User from '../_models/User.model';
import bcryptjs from "bcryptjs";

export async function sendMail({ email, emailType, userId }) {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5771f1268aaa7e",
                pass: "2c678fac6d00e7"
            }
        });

        const mailOptions = {
            from: 'maddison53@ethereal.email',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email using this token" : "Reset your password",// Subject line
            html: `<p>
                Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>HERE</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser.
                <br></br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`
        }

        const mailResponse = transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        throw new Error(error.message)
    }

}