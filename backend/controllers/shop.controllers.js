import uploadCloudinary from "../utils/cloudinary.js";
import Shop from '../models/shop.model.js';

export const createEditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body
        let image
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }
        let shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            shop = await Shop.create({
                name,
                city,
                state,
                address,
                ...(image && { image }),
                owner: req.userId
            })
        } else {
            const updateData = {
                name,
                city,
                state,
                address,
                owner: req.userId
            }
            if (image) {
                updateData.image = image
            }
            shop = await Shop.findByIdAndUpdate(shop._id, updateData, {
                new: true
            })
        }

        await shop.populate("owner items")
        return res.status(201).json(shop)
    } catch (err) {
        return res.status(500).json({ message: `Tạo cửa hàng thất bại: ${err.message}` })
    }
}

export const getMyShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.userId }).populate('owner items')
        if (!shop) {
            return res.status(404).json({ message: "Chưa có cửa hàng" })
        }
        return res.status(200).json(shop)
    } catch (err) {
        return res.status(500).json({ message: `Lấy cửa hàng thất bại: ${err.message}` })
    }
}