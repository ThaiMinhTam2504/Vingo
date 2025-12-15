import React, { use, useState } from 'react'
import { IoLocation } from 'react-icons/io5'
import { IoIosSearch } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { FaPlus } from 'react-icons/fa6'
import { TbReceipt } from 'react-icons/tb'

const Nav = () => {
    const { userData, city } = useSelector(state => state.user)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='w-full h-20 flex items-center justify-between
        md:justify-center gap-[30px] px-5 fixed top-0 z-9999 bg-[#fff9f6]
        overflow-visible'>
            {showSearch && userData.user.role == 'user' &&
                <div className='w-[90%] h-[70px] flex fixed top-20 md:hidden left-[5%] bg-white shadow-xl rounded-lg items-center gap-5'>
                    <div className='flex items-center min-w-[30px] overflow-hidden gap-2.5 px-2.5 border-r-0.5 border-gray-400'>
                        <IoLocation size={25} className='text-[#ff4d2d]' />
                        <div className='w-[80%] truncate text-gray-600'>{city}</div>

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
            }
            <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Vingo</h1>
            {userData?.user?.role == 'user' && <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-5'>
                <div className='flex items-center min-w-[30px] overflow-hidden gap-2.5 px-2.5 border-r-0.5 border-gray-400'>
                    <IoLocation size={25} className='text-[#ff4d2d]' />
                    <div className='w-[80%] truncate text-gray-600'>{city}</div>

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
            </div>}


            <div className='flex items-center gap-4'>
                {userData?.user?.role === 'user' &&
                    (showSearch ? <RxCross2

                        onClick={() => setShowSearch(false)}
                        size={25}
                        className='text-[#ff4d2d] md:hidden' />
                        : <IoIosSearch
                            onClick={() => setShowSearch(true)}
                            size={25}
                            className='text-[#ff4d2d] md:hidden' />)
                }
                {
                    userData?.user?.role === 'owner' ? (
                        <>
                            <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                                <FaPlus size={20} />
                                <span>Thêm món</span>
                            </button>

                            <button className='md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                                <FaPlus size={20} />
                            </button>

                            <div className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1
                            rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                                <TbReceipt size={20} className='text-[#ff4d2d]' />
                                <span>Đơn của tôi</span>
                                <span className='absolute -right-2 -top-3 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-2.5 py-0.5'>0</span>
                            </div>
                            <div className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1
                            rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                                <TbReceipt size={20} className='text-[#ff4d2d]' />
                                <span className='absolute -right-2 -top-3 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-2.5 py-0.5'>0</span>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <div className='relative cursor-pointer'>
                                    <FiShoppingCart size={25} className='text-[#ff4d2d]' />
                                    <span className='absolute right-[-9px] -top-3 text-[#ff4d2d]'>0</span>
                                </div>
                                <button className='hidden md:block px-3 py-1 rounded-lg
                 bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>
                                    Đơn hàng
                                </button>
                            </>
                        )
                }




                <div className='w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d]
                     text-white text-[18px] shadow-xl font-semibold cursor-pointer'
                    onClick={() => setShowInfo(prev => !prev)}
                >
                    {userData?.user.fullName.slice(0, 1)}
                </div>
                {showInfo && <div className='fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-[180px] bg-white
                shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999'>
                    <div className='text-[17px] font-semibold'>{userData?.user.fullName}</div>
                    <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>Đơn của tôi</div>
                    <div className='text-[#ff4d2d] cursor-pointer font-semibold' onClick={handleLogOut}>Đăng xuất</div>
                </div>}

            </div>
        </div >
    )
}

export default Nav