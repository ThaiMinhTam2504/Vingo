import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        const user = await User.findOne({ email })
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
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: "Người dùng không tồn tại."
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
