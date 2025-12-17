import React from 'react'
import Nav from './Nav'
import { FaUtensils } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import OwnerItemCard from './OwnerItemCard'


const OwnerDashboard = () => {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center'>
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

            {myShopData &&
                <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>
                    <h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center'><FaUtensils size={25} className='text-[#ff4d2d] w-14 h-14 sm:w-20 sm:h-20 mb-4' />Chào mừng đến với {myShopData.name}</h1>

                    <div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100
                    hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>
                        <div className='absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md
                        hover:bg-orange-600 transition-colors cursor-pointer'
                            onClick={() => navigate('/create-edit-shop')}>
                            <FaPen size={20} />
                        </div>
                        <img src={myShopData.image} alt={myShopData.name} className="w-full h-48 sm:h-64
                        object-cover" />
                        <div className='p-4 sm:p-6'>
                            <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>{myShopData.name}</h1>
                            <p className='text-gray-500'>{myShopData.city},{myShopData.state}</p>
                            <p className='text-gray-500 mb-4'>{myShopData.address}</p>
                        </div>

                    </div>
                    {myShopData.items.length == 0 &&
                        <div className='flex justify-center items-center p-4 sm:p-6'>
                            <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border 
                    border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                                <div className='flex flex-col items-center text-center'>
                                    <FaUtensils size={25} className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
                                    <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Thêm món vào menu của bạn.</h2>
                                    <p className='text-gray-600 mb-4 text-sm sm:text-base'>Chia sẻ món ăn của bạn với khách hàng.</p>
                                    <button onClick={() => navigate('/add-item')}
                                        className='px-4 py-2 bg-[#ff4d2d] text-white rounded-full 
                            hover:bg-[#e04326] transition-colors duration-300 text-sm sm:text-base font-medium'>
                                        Thêm món
                                    </button>
                                </div>

                            </div>
                        </div>
                    }

                    {myShopData.items.length > 0 &&
                        <div className='flex flex-col items-center gap-4 w-full max-w-3xl mb-8'>
                            {myShopData?.items.map((item, index) => (
                                <OwnerItemCard data={item} key={index} item={item} />
                            )
                            )}
                        </div>}

                </div>}


        </div>
    )
}

export default OwnerDashboard