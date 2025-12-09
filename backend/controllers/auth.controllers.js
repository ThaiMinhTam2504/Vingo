import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"
import e from "express"

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User đã tồn tại."
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Mật khẩu phải có ít nhất 6 ký tự."
            })
        }
        if (mobile.length < 10) {
            return res.status(400).json({
                message: "Số điện thoại phải có ít nhất 10 chữ số."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        })
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json({
            message: "Đăng ký thành công.",
            user
        })


    } catch (err) {
        return res.status(500).json({ message: `Lỗi đăng ký người dùng. ${err}` })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email && !password) {
            const emailInDatabase = await User.findOne({ email })
            if (!emailInDatabase) {
                return res.status(400).json({
                    message: "Email không tồn tại hoặc người dùng chưa đăng ký."
                })
            } else {
                return res.status(400).json({
                    message: "Vui lòng nhập mật khẩu."
                })
            }
        }
        if (!email && password) {
            return res.status(400).json({
                message: "Vui lòng nhập email."
            })
        }
        if (!email && !password) {
            return res.status(400).json({
                message: "Vui lòng nhập email và mật khẩu."
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại hoặc người dùng chưa đăng ký."
            })
        }

        // Kiểm tra user.password có tồn tại không (trường hợp dữ liệu corrupt)
        if (!user.password) {
            return res.status(500).json({
                message: "Lỗi hệ thống: Dữ liệu người dùng không hợp lệ."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng."
            })
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(200).json({
            message: "Đăng nhập thành công.",
            user
        })
    } catch (err) {
        return res.status(500).json({ message: `Lỗi đăng nhập người dùng. ${err}` })
    }
}
export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: "Đăng xuất thành công."
        })
    } catch (err) {
        return res.status(500).json({ message: `Lỗi đăng xuất người dùng. ${err}` })
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại." })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({ message: "Mã OTP đã được gửi đến email của bạn." })
    } catch (err) {
        return res.status(500).json({ message: `Lỗi gửi OTP. ${err}` })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Mã OTP không hợp lệ hoặc đã hết hạn." })
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: "Xác nhận OTP thành công." })
    } catch (err) {
        return res.status(500).json({ message: `Lỗi xác nhận OTP. ${err}` })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "Xác thực OTP là bắt buộc." })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({ message: "Đặt lại mật khẩu thành công." })

    } catch (err) {
        return res.status(500).json({ message: `Lỗi đặt lại mật khẩu. ${err}` })
    }
}


export const googleAuth = async (req, res) => {
    try {
        const { fullName, email, mobile, role } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                fullName,
                email,
                mobile,
                role,
            })
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.status(200).json({
            message: "Xác thực Google thành công.",
            user
        })
    } catch (err) {
        return res.status(500).json({ message: `Lỗi xác thực Google. ${err}` })
    }
}