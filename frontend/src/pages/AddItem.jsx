import { useEffect, useState } from 'react'
import { FaUtensils } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { MdCloudUpload, MdImage, MdZoomIn, MdZoomOut } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setMyShopData } from '../redux/ownerSlice'


const AddItem = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [foodType, setFoodType] = useState('non-veg')
    const categories = [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "North Indian",
        "South Indian",
        "Chinese",
        "Fast Food",
        "Beverages",
        "Others"
    ]
    const convertEnglishToVietnamese = (category) => {
        const categoryMap = {
            "Snacks": "Đồ ăn nhẹ",
            "Main Course": "Món chính",
            "Desserts": "Món tráng miệng",
            "Pizza": "Pizza",
            "Burgers": "Bánh mì kẹp",
            "Sandwiches": "Bánh mì sandwich",
            "North Indian": "Đồ ăn Bắc Ấn",
            "South Indian": "Đồ ăn Nam Ấn",
            "Chinese": "Đồ ăn Trung Quốc",
            "Fast Food": "Đồ ăn nhanh",
            "Beverages": "Đồ uống",
            "Others": "Khác"
        };
        return categoryMap[category] || category;
    }


    const [frontendImage, setFrontendImage] = useState(myShopData?.items.length > 0 || null)
    const [backendImage, setBackendImage] = useState(null)
    const [showLargePreview, setShowLargePreview] = useState(false)
    const [isPortrait, setIsPortrait] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [imageError, setImageError] = useState('')

    const validateImage = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!validTypes.includes(file.type)) {
            setImageError('Chỉ hỗ trợ file ảnh (JPEG, PNG, GIF, WebP)')
            return false
        }

        if (file.size > maxSize) {
            setImageError('Kích thước ảnh không được vượt quá 5MB')
            return false
        }

        setImageError('')
        return true
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!validateImage(file)) {
            return
        }

        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
        setIsPortrait(null)
    }

    // Revoke object URLs to avoid memory leaks when image changes/unmounts
    useEffect(() => {
        return () => {
            if (frontendImage && typeof frontendImage === 'string' && frontendImage.startsWith('blob:')) {
                URL.revokeObjectURL(frontendImage)
            }
        }
    }, [frontendImage])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate required fields
        if (!name.trim()) {
            setError('Vui lòng nhập tên món')
            return
        }


        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('name', name)
            formData.append('foodType', foodType)
            formData.append('category', category)
            formData.append('price', price)

            if (backendImage) {
                formData.append('image', backendImage)
            }

            const result = await axios.post(`${serverUrl}/api/item/add-item`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(setMyShopData(result.data))
            setLoading(false)
            navigate('/')
        } catch (err) {
            setLoading(false)
            const errMsg = err.response?.data?.message || err.message || 'Có lỗi xảy ra'
            setError(errMsg)
            console.log(err)
        }
    }
    return (
        <div className='flex justify-center flex-col items-center p-6 bg-linear-to-br from-orange-100 relative to-white min-h-screen'>
            <div onClick={() => navigate('/')} className='absolute top-5 left-5 z-10 mb-2.5'>
                <IoIosArrowRoundBack size={40} className='text-[#ff4d2d]' />
            </div>


            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <FaUtensils size={40} className='text-[#ff4d2d] w-16 h-16' />
                    </div>
                    <div className='text-3xl font-extrabold text-gray-900'>
                        Thêm món
                    </div>
                </div>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div >
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Tên món</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type='text' placeholder='Nhập tên món' className='w-full px-4 py-2
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Hình ảnh món</label>
                        <div className='relative'>
                            <input
                                type='file'
                                id='file-upload'
                                accept='image/*'
                                className='hidden'
                                onChange={handleImage}
                            />
                            <label
                                htmlFor='file-upload'
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${frontendImage
                                    ? 'border-green-400 bg-green-50 hover:bg-green-100'
                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-orange-400'
                                    }`}
                            >
                                {frontendImage ? (
                                    <div className='flex w-full h-full items-center justify-between gap-1'>
                                        <div className='flex flex-col items-center w-[50%]'>
                                            <MdImage size={40} className='text-green-500 mb-2' />
                                            <span className='text-sm font-medium text-green-600'>Đã chọn ảnh</span>
                                            <span className='text-xs text-gray-500 mt-1'>Click để thay đổi</span>
                                        </div>

                                        <div className='w-[50%] h-full overflow-hidden'>
                                            <img
                                                src={frontendImage}
                                                alt='Ảnh món'
                                                onLoad={(e) => {
                                                    const img = e.currentTarget
                                                    setIsPortrait(img.naturalHeight > img.naturalWidth)
                                                }}
                                                className={`w-full h-full rounded-lg ${isPortrait ? 'object-cover' : 'object-contain'} object-center`}
                                            />
                                        </div>
                                    </div>

                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <MdCloudUpload size={40} className='text-gray-400 mb-2' />
                                        <span className='text-sm font-medium text-gray-600'>Tải ảnh lên</span>
                                        <span className='text-xs text-gray-400 mt-1'>Click để chọn ảnh</span>
                                    </div>
                                )}
                            </label>
                            {frontendImage && (
                                <button
                                    type='button'
                                    title={showLargePreview ? 'Thu nhỏ ảnh preview' : 'Phóng to ảnh preview'}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowLargePreview(v => !v) }}
                                    className='absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm transition transform hover:scale-110 hover:shadow-md hover:border-orange-300 hover:text-[#ff4d2d]'
                                >
                                    {showLargePreview ? <MdZoomOut size={18} className='text-gray-700' /> : <MdZoomIn size={18} className='text-gray-700' />}
                                </button>
                            )}
                        </div>
                        {imageError && (
                            <div className='mt-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
                                <span className='text-sm text-red-600'>{imageError}</span>
                            </div>
                        )}
                        {showLargePreview && frontendImage && (
                            <div className='mt-4 w-full h-64 rounded-lg border-2 border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center overflow-hidden'>
                                <img
                                    src={frontendImage}
                                    alt='Ảnh preview món'
                                    className='max-w-full max-h-full object-contain'
                                />
                            </div>
                        )}
                    </div>

                    <div >
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Giá</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            type='number' placeholder='0' className='w-full px-4 py-2
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                    </div>

                    <div >
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Loại món ăn</label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            className='w-full px-4 py-2
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'>
                            <option value="" disabled>Chọn loại món ăn</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{convertEnglishToVietnamese(cat)}</option>
                            ))}
                        </select>
                    </div>

                    <div >
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Chay hay không?</label>
                        <select
                            onChange={(e) => setFoodType(e.target.value)}
                            value={foodType}
                            className='w-full px-4 py-2
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'>
                            <option value="non-veg">Không chay</option>
                            <option value="veg">Chay</option>
                        </select>
                    </div>



                    {error && (
                        <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
                            <span className='text-sm text-red-600'>{error}</span>
                        </div>
                    )}



                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg
                    font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? (
                            <div className='flex items-center justify-center gap-2'>
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                <span>Đang xử lý...</span>
                            </div>
                        ) : (
                            "Thêm món"
                        )}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AddItem