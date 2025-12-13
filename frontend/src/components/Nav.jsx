import React, { use, useState } from 'react'
import { IoLocation } from 'react-icons/io5'
import { IoIosSearch } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const Nav = () => {
    const { userData } = useSelector(state => state.user)
    const [showInfo, setShowInfo] = useState(false)
    return (
        <div className='w-full h-20 flex items-center justify-between
        md:justify-center gap-[30px] px-5 fixed top-0 z-9999 bg-[#fff9f6]
        overflow-visible'>
            <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Vingo</h1>
            <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-5'>
                <div className='flex items-center min-w-[30px] overflow-hidden gap-2.5 px-2.5 border-r-0.5 border-gray-400'>
                    <IoLocation size={25} className='text-[#ff4d2d]' />
                    <div className='w-[80%] truncate text-gray-600'>Địa chỉ</div>

                </div>
                <div className='w-[80%] flex items-center gap-2.5'>
                    <div className='border-r-3 border-r-gray-200 h-11'></div>
                    <IoIosSearch size={25} color={'#ff4d2d'} className='text-gray-600 mx-3' />
                    <input
                        className='px-2.5 text-gray-700 outline-0 w-full'
                        type='text'
                        placeholder='Tìm món ăn ngon ở đây...'

                    />
                </div>

            </div>

            <div className='flex items-center gap-6'>
                <IoIosSearch size={25} className='text-[#ff4d2d] md:hidden' />
                <div className='relative cursor-pointer'>
                    <FiShoppingCart size={25} className='text-[#ff4d2d]' />
                    <span className='absolute right-[-9px] -top-3 text-[#ff4d2d]'>0</span>
                </div>
                <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>Đơn hàng</button>
                <div onClick={() => setShowInfo(prev => !prev)} className='w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer'>
                    {userData?.user.fullName.slice(0, 1)}
                </div>
                {showInfo && <div className='fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-[180px] bg-white
                shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999'>
                    <div className='text-[17px] font-semibold'>{userData?.user.fullName}</div>
                    <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>Đơn của tôi</div>
                    <div className='text-[#ff4d2d] cursor-pointer font-semibold'>Đăng xuất</div>
                </div>}

            </div>
        </div>
    )
}

export default Nav