import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (err) {
        console.log("db error")
    }
}

export default connectDb