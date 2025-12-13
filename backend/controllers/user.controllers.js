import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ message: "Không tìm thấy người dùng." })
        }
        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." })
        }
        return res.status(200).json({ user })
    } catch (err) {
        return res.status(500).json({ message: `Lỗi lấy thông tin người dùng. ${err}` })
    }
}