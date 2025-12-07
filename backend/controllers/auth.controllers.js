import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const signUp = async (req, res) => {
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



    } catch (err) {
        return res.status(500).json({
            message: "Đã xảy ra lỗi."
        })
    }
}