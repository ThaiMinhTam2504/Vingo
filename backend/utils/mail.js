import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const sendOtpMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: "Mã OTP đặt lại mật khẩu Vingo",
        html: `<p>Mã OTP của bạn là <b>${otp}</b>. Mã này sẽ hết hạn trong 5 phút.</p>`
    })
}