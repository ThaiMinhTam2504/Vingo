import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUtensils } from 'react-icons/fa'
import { MdCloudUpload, MdImage } from 'react-icons/md'

const CreateEditShop = () => {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)

    const [name, setName] = useState(myShopData?.name || '')
    const [address, setAddress] = useState(myShopData?.currentAddress || currentAddress || '')
    const [city, setCity] = useState(myShopData?.currentCity || currentCity || '')
    const [state, setState] = useState(myShopData?.currentState || currentState || '')

    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
    const [backendImage, setBackendImage] = useState(null)

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
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
                        {myShopData ? "Chinh sửa cửa hàng" : "Thêm cửa hàng mới"}
                    </div>
                </div>
                <form className='space-y-5'>
                    <div >
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Tên</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type='text' placeholder='Nhập tên cửa hàng' className='w-full px-4 py-2
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Hình ảnh</label>
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
                                    <div className='flex flex-col items-center'>
                                        <MdImage size={40} className='text-green-500 mb-2' />
                                        <span className='text-sm font-medium text-green-600'>Đã chọn ảnh</span>
                                        <span className='text-xs text-gray-500 mt-1'>Click để thay đổi</span>
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <MdCloudUpload size={40} className='text-gray-400 mb-2' />
                                        <span className='text-sm font-medium text-gray-600'>Tải ảnh lên</span>
                                        <span className='text-xs text-gray-400 mt-1'>Click để chọn ảnh</span>
                                    </div>
                                )}
                            </label>
                        </div>
                        {frontendImage && <div className='mt-4'>
                            <img src={frontendImage} alt="Shop Front" className='w-full h-48 object-cover rounded-lg border-2 border-gray-200 shadow-sm' />
                        </div>}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Thành phố</label>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                type='text' placeholder='Nhập thành phố' className='w-full px-4 py-2 
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Tỉnh</label>
                            <input
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                                type='text' placeholder='Nhập tỉnh' className='w-full px-4 py-2 
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Địa chỉ</label>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            type='text' placeholder='Nhập địa chỉ cửa hàng' className='w-full px-4 py-2 
                        border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                    </div>

                    <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg
                    font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                        {myShopData ? "Cập nhật cửa hàng" : "Tạo cửa hàng"}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default CreateEditShop