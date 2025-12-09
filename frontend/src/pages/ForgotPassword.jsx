import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { FaEye, FaRegEyeSlash, FaEnvelope, FaShieldAlt, FaLock } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
    const primaryColor = "#ff4d2d"
    const inactiveColor = "#d1d5db"

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    // State cho validation errors
    const [errors, setErrors] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    })

    // Validation logic cho từng field
    const validateField = (fieldName, value) => {
        let error = ''

        switch (fieldName) {
            case 'email':
                if (!value.trim()) {
                    error = 'Vui lòng nhập email.'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Email không hợp lệ.'
                }
                break
            case 'otp':
                if (!value.trim()) {
                    error = 'Vui lòng nhập mã OTP.'
                }
                break
            case 'newPassword':
                if (!value) {
                    error = 'Vui lòng nhập mật khẩu mới.'
                } else if (value.length < 6) {
                    error = 'Mật khẩu phải có ít nhất 6 ký tự.'
                }
                break
            case 'confirmPassword':
                if (!value) {
                    error = 'Vui lòng nhập lại mật khẩu.'
                } else if (value !== newPassword) {
                    error = 'Mật khẩu xác nhận không khớp với mật khẩu mới.'
                }
                break
            default:
                break
        }

        return error
    }

    // Handle blur event
    const handleBlur = (fieldName, value) => {
        const error = validateField(fieldName, value)
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }))
    }

    // Handle change - xóa error khi user bắt đầu sửa
    const handleChange = (fieldName, value) => {
        if (fieldName === 'email') setEmail(value)
        else if (fieldName === 'otp') setOtp(value)
        else if (fieldName === 'newPassword') setNewPassword(value)
        else if (fieldName === 'confirmPassword') setConfirmPassword(value)

        // Xóa error nếu user đang sửa
        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }))
        }
    }

    //step1: send otp
    const handleSendOtp = async () => {
        const error = validateField('email', email)
        if (error) {
            setErrors(prev => ({ ...prev, email: error }))
            toast.error(error, {
                position: 'top-right',
                autoClose: 3000
            })
            return
        }

        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {
                email
            }, {
                withCredentials: true
            })
            console.log(result)
            toast.success('Mã OTP đã được gửi đến email của bạn!', {
                position: 'top-right',
                autoClose: 2000
            })
            setStep(2)
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Gửi OTP thất bại. Vui lòng thử lại.'
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000
            })
        }
    }

    //step2: verify otp
    const handleVerifyOtp = async () => {
        const error = validateField('otp', otp)
        if (error) {
            setErrors(prev => ({ ...prev, otp: error }))
            toast.error(error, {
                position: 'top-right',
                autoClose: 3000
            })
            return
        }

        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
                email,
                otp
            }, {
                withCredentials: true
            })
            console.log(result)
            toast.success('Xác minh OTP thành công!', {
                position: 'top-right',
                autoClose: 2000
            })
            setStep(3)
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Xác minh OTP thất bại. Vui lòng thử lại.'
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000
            })
        }
    }

    //step3: reset password
    const handleResetPassword = async () => {
        const newPasswordError = validateField('newPassword', newPassword)
        const confirmPasswordError = validateField('confirmPassword', confirmPassword)

        const newErrors = {
            newPassword: newPasswordError,
            confirmPassword: confirmPasswordError
        }

        setErrors(prev => ({ ...prev, ...newErrors }))

        if (newPasswordError || confirmPasswordError) {
            const firstError = newPasswordError || confirmPasswordError
            toast.error(firstError, {
                position: 'top-right',
                autoClose: 3000
            })
            return
        }

        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {
                email,
                newPassword,
                confirmPassword
            }, {
                withCredentials: true
            })
            toast.success('Đổi mật khẩu thành công! Đang chuyển hướng...', {
                position: 'top-right',
                autoClose: 2000
            })
            console.log(result)
            setTimeout(() => navigate('/signin'), 2000)
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.'
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000
            })
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <ToastContainer />
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-8'>
                    <button
                        type='button'
                        onClick={() => navigate('/signin')}
                        title='Quay lại'
                        className='w-10 h-10 rounded-full  flex items-center justify-center transition-colors duration-100 hover:bg-[#ff4d2d] hover:border-[1px] hover:text-white cursor-pointer'
                    // style={{ borderColor: primaryColor, color: 'var(--primary-color)', '--primary-color': primaryColor }}
                    >
                        <IoIosArrowRoundBack
                            size={35}
                        // className='transition-colors duration-300 '

                        // style={{ color: 'var(--primary-color)' }}
                        // style={{ color: primaryColor }}
                        />
                    </button>
                    <h1 className='text-2xl font-bold text-center flex-1' style={{ color: primaryColor }}>Quên mật khẩu</h1>
                </div>

                {/* Progress Bar */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-4'>
                        {/* Step 1 */}
                        <div className='flex flex-col items-center flex-1'>
                            <div
                                className='w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-colors duration-300'
                                style={{
                                    backgroundColor: step >= 1 ? primaryColor : inactiveColor,
                                    color: 'white'
                                }}
                            >
                                <FaEnvelope size={24} />
                            </div>
                            <p className='text-xs font-semibold text-center' style={{ color: step >= 1 ? primaryColor : inactiveColor }}>
                                Email
                            </p>
                        </div>

                        {/* Connector Line 1 */}
                        <div className='flex-1 h-1 mx-2 mb-7 rounded transition-colors duration-300' style={{ backgroundColor: step >= 2 ? primaryColor : inactiveColor }}></div>

                        {/* Step 2 */}
                        <div className='flex flex-col items-center flex-1'>
                            <div
                                className='w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-colors duration-300'
                                style={{
                                    backgroundColor: step >= 2 ? primaryColor : inactiveColor,
                                    color: 'white'
                                }}
                            >
                                <FaShieldAlt size={24} />
                            </div>
                            <p className='text-xs font-semibold text-center' style={{ color: step >= 2 ? primaryColor : inactiveColor }}>
                                Xác minh OTP
                            </p>
                        </div>

                        {/* Connector Line 2 */}
                        <div className='flex-1 h-1 mx-2 mb-7 rounded transition-colors duration-300' style={{ backgroundColor: step >= 3 ? primaryColor : inactiveColor }}></div>

                        {/* Step 3 */}
                        <div className='flex flex-col items-center flex-1'>
                            <div
                                className='w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-colors duration-300'
                                style={{
                                    backgroundColor: step >= 3 ? primaryColor : inactiveColor,
                                    color: 'white'
                                }}
                            >
                                <FaLock size={24} />
                            </div>
                            <p className='text-xs font-semibold text-center' style={{ color: step >= 3 ? primaryColor : inactiveColor }}>
                                Mật khẩu mới
                            </p>
                        </div>
                    </div>
                </div>
                {step == 1
                    &&
                    <div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-1' htmlFor='email'>Email</label>
                            <input
                                required
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={(e) => handleBlur('email', e.target.value)}
                                value={email}
                                type='email'
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.email ? 'border-red-500' : ''}`}
                                placeholder='Điền email của bạn'
                                style={{ border: errors.email ? '1px solid #ef4444' : '1px solid #e5e7eb' }}
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>*{errors.email}</p>}
                        </div>
                        <button
                            onClick={handleSendOtp}
                            className={`w-full font-semibold rounded-lg py-2 transition duration-200 text-white hover:opacity-90 cursor-pointer`}
                            style={{ backgroundColor: primaryColor }}
                        >
                            Lấy mã OTP
                        </button>
                    </div>}
                {step == 2
                    &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor='otp' className='block text-gray-700 font-medium mb-1'>Mã OTP</label>
                            <input
                                onChange={(e) => handleChange('otp', e.target.value)}
                                onBlur={(e) => handleBlur('otp', e.target.value)}
                                required
                                value={otp}
                                type='text'
                                placeholder='Nhập mã OTP của bạn'
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.otp ? 'border-red-500' : ''}`}
                                style={{ border: errors.otp ? '1px solid #ef4444' : '1px solid #e5e7eb' }}
                            />
                            {errors.otp && <p className='text-red-500 text-sm mt-1'>*{errors.otp}</p>}
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white hover:opacity-90 cursor-pointer`}
                            style={{ backgroundColor: primaryColor }}
                        >
                            Xác nhận mã OTP
                        </button>
                    </div>}
                {step == 3
                    &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'>Mật khẩu mới</label>
                            <div className='relative mb-4'>
                                <input
                                    required
                                    onChange={(e) => handleChange('newPassword', e.target.value)}
                                    onBlur={(e) => handleBlur('newPassword', e.target.value)}
                                    value={newPassword}
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder='Nhập mật khẩu mới của bạn'
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.newPassword ? 'border-red-500' : ''}`}
                                    style={{ border: errors.newPassword ? '1px solid #ef4444' : '1px solid #e5e7eb' }}
                                />
                                <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <FaRegEyeSlash size={20} /> : <FaEye size={20} />}</button>
                            </div>
                            {errors.newPassword && <p className='text-red-500 text-sm mt-1'>*{errors.newPassword}</p>}

                            <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-1'>Nhập lại mật khẩu mới</label>
                            <div className='relative'>
                                <input
                                    required
                                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                    onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                                    value={confirmPassword}
                                    type={isShowConfirmPassword ? 'text' : 'password'}
                                    placeholder='Nhập lại mật khẩu mới của bạn'
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    style={{ border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid #e5e7eb' }}
                                />
                                <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>{isShowConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaEye size={20} />}</button>
                            </div>
                            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>*{errors.confirmPassword}</p>}
                        </div>
                        <button
                            onClick={handleResetPassword}
                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white hover:opacity-90 cursor-pointer`}
                            style={{ backgroundColor: primaryColor }}
                        >
                            Xác nhận đổi mật khẩu
                        </button>
                    </div>}
            </div>
        </div>
    )
}

export default ForgotPassword