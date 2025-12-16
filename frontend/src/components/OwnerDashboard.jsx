import React from 'react'
import Nav from './Nav'
import { FaUtensils } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FaU } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const OwnerDashboard = () => {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    return (
        <div className='w-full m-h-screen bg-[#fff9f6] flex flex-col items-center'>
            <Nav />
            {!myShopData &&
                <div className='flex justify-center items-center p-4 sm:p-6'>
                    <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border 
                    border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex flex-col items-center text-center'>
                            <FaUtensils size={25} className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
                            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Thêm cửa hàng</h2>
                            <p className='text-gray-600 mb-4 text-sm sm:text-base'>Tham gia hệ thống giao hàng thức ăn của chúng tôi để bắt đầu kinh doanh ngay hôm nay.</p>
                            <button onClick={() => navigate('/create-edit-shop')}
                                className='px-4 py-2 bg-[#ff4d2d] text-white rounded-full 
                            hover:bg-[#e04326] transition-colors duration-300 text-sm sm:text-base font-medium'>
                                Bắt đầu ngay
                            </button>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default OwnerDashboard