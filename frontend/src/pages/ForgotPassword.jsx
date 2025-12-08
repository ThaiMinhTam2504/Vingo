import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [step, setStep] = useState(3)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const handleGetOTP = () => {

    }
    return (
        <div className='flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack onClick={() => navigate('/signin')} size={30} className='text-[#ff4d2d] cursor-pointer' />
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Quên mật khẩu</h1>
                </div>
                {step == 1
                    &&
                    <div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-1' htmlFor='email'>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type='email'
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none border-gray-200'
                                placeholder='Điền email của bạn' >
                            </input>
                        </div>
                        <button
                            onClick={handleGetOTP}
                            className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} >
                            Lấy mã OTP
                        </button>
                    </div>}
                {step == 2
                    &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor='otp' className='block text-gray-700 font-medium mb-1'>Mã OTP</label>
                            <input
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                                type='text'
                                placeholder='Nhập mã OTP của bạn'
                                className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                            />
                        </div>
                        <button
                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
                        >
                            Xác nhận mã OTP
                        </button>
                    </div>}
                {step == 3
                    &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'>Mật khẩu mới</label>
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                type='password'
                                placeholder='Nhập mật khẩu mới của bạn'
                                className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                            />
                            <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-1'>Nhập lại mật khẩu mới</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                type='password'
                                placeholder='Nhập lại mật khẩu mới của bạn'
                                className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none'
                            />
                        </div>
                        <button
                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
                        >
                            Xác nhận đổi mật khẩu
                        </button>
                    </div>}
            </div>
        </div>
    )
}

export default ForgotPassword