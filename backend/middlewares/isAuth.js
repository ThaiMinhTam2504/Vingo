import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Bạn cần đăng nhập để truy cập tài nguyên này." })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            return res.status(401).json({ message: "Token không hợp lệ. Vui lòng đăng nhập lại." })
        }
        req.userId = decodedToken.userId
        next()
    } catch (err) {
        return res.status(500).json({ message: `Lỗi xác thực người dùng. ${err}` })
    }
}

export default isAuth