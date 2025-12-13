import React, { useState } from 'react'
import { FaEye, FaRegEyeSlash, FaUser, FaStore, FaTruck } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const SignUp = () => {
    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('user')
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    // State cho validation errors
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: ''
    })

    // Validation logic cho từng field
    const validateField = (fieldName, value) => {
        let error = ''

        switch (fieldName) {
            case 'fullName':
                if (!value.trim()) {
                    error = 'Vui lòng nhập họ tên.'
                }
                break
            case 'email':
                if (!value.trim()) {
                    error = 'Vui lòng nhập email.'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Email không hợp lệ.'
                }
                break
            case 'mobile':
                if (!value.trim()) {
                    error = 'Vui lòng nhập số điện thoại.'
                } else if (!/^\d{10,}$/.test(value.replace(/\D/g, ''))) {
                    error = 'Số điện thoại phải có ít nhất 10 chữ số.'
                }
                break
            case 'password':
                if (!value) {
                    error = 'Vui lòng nhập mật khẩu.'
                } else if (value.length < 6) {
                    error = 'Mật khẩu phải có ít nhất 6 ký tự.'
                }
                break
            default:
                break
        }

        return error
    }

    // Handle blur event - validate field khi user rời khỏi input
    const handleBlur = (fieldName, value) => {
        const error = validateField(fieldName, value)
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }))
    }

    // Handle change - xóa error khi user bắt đầu sửa
    const handleChange = (fieldName, value) => {
        if (fieldName === 'fullName') setFullName(value)
        else if (fieldName === 'email') setEmail(value)
        else if (fieldName === 'mobile') setMobile(value)
        else if (fieldName === 'password') setPassword(value)

        // Xóa error nếu user đang sửa
        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }))
        }
    }

    // Validate all fields trước khi submit
    const validateAllFields = () => {
        const newErrors = {
            fullName: validateField('fullName', fullName),
            email: validateField('email', email),
            mobile: validateField('mobile', mobile),
            password: validateField('password', password)
        }

        setErrors(newErrors)

        // Nếu tất cả fields bỏ trống
        if (!fullName && !email && !mobile && !password) {
            toast.error('Vui lòng điền tất cả trường.', {
                position: 'top-right',
                autoClose: 3000
            })
            return false
        }

        // Nếu có bất kỳ error nào
        return !Object.values(newErrors).some(error => error !== '')
    }

    const handleSignUp = async () => {
        if (!validateAllFields()) {
            return
        }
        setLoading(true)

        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName,
                email,
                password,
                mobile,
                role
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setLoading(false)
            toast.success('Đăng ký thành công!', {
                position: 'top-right',
                autoClose: 2000
            })
            setTimeout(() => navigate('/signin'), 2000)
        } catch (err) {
            setLoading(false)
            const errorMessage = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000
            })
        }
    }

    const handleGoogleAuth = async () => {
        if (!mobile) {
            toast.warning("Vui lòng điền số điện thoại của bạn trước khi đăng ký bằng Google.", {
                position: 'top-right',
                autoClose: 3000
            })
            return
        }
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, {
                withCredentials: true
            })
            dispatch(setUserData(data))
            toast.success('Đăng ký Google thành công!', {
                position: 'top-right',
                autoClose: 2000
            })
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đăng ký Google thất bại.'
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000
            })
            console.log(err)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <ToastContainer />
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-[${borderColor}]`}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
                <p className='text-gray-600 mb-8'>Hãy tạo tài khoản của bạn để bắt đầu với Vingo và đặt những món ăn ngon nhất.</p>
                {/* Fullname */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='fullName'>Họ tên</label>
                    <input
                        required
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={(e) => handleBlur('fullName', e.target.value)}
                        value={fullName}
                        type='text'
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.fullName ? 'border-red-500' : ''}`}
                        placeholder='Điền tên của bạn'
                        style={{ border: errors.fullName ? '1px solid #ef4444' : `1px solid ${borderColor}` }}
                    />
                    {errors.fullName && <p className='text-red-500 text-sm mt-1'>*{errors.fullName}</p>}
                </div>
                {/* Email */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='email'>Email</label>
                    <input
                        required
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={(e) => handleBlur('email', e.target.value)}
                        value={email}
                        type='email'
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.email ? 'border-red-500' : ''}`}
                        placeholder='Điền email của bạn'
                        style={{ border: errors.email ? '1px solid #ef4444' : `1px solid ${borderColor}` }}
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>*{errors.email}</p>}
                </div>
                {/*mobile*/}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='mobile'>Số điện thoại</label>
                    <input
                        required
                        onChange={(e) => handleChange('mobile', e.target.value)}
                        onBlur={(e) => handleBlur('mobile', e.target.value)}
                        value={mobile}
                        type='tel'
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.mobile ? 'border-red-500' : ''}`}
                        placeholder='Điền số điện thoại của bạn'
                        style={{ border: errors.mobile ? '1px solid #ef4444' : `1px solid ${borderColor}` }}
                    />
                    {errors.mobile && <p className='text-red-500 text-sm mt-1'>*{errors.mobile}</p>}
                </div>
                {/* Password */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='password'>Mật khẩu</label>
                    <div className='relative'>
                        <input
                            required
                            onChange={(e) => handleChange('password', e.target.value)}
                            onBlur={(e) => handleBlur('password', e.target.value)}
                            value={password}
                            type={`${showPassword ? "text" : "password"}`}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none transition ${errors.password ? 'border-red-500' : ''}`}
                            placeholder='Điền mật khẩu của bạn'
                            style={{ border: errors.password ? '1px solid #ef4444' : `1px solid ${borderColor}` }}
                        />
                        <button onClick={() => setShowPassword(prev => !prev)} className='absolute cursor-pointer right-3 top-3.5 text-gray-500'>{!showPassword ? <FaEye /> : <FaRegEyeSlash />}</button>
                    </div>
                    {errors.password && <p className='text-red-500 text-sm mt-1'>*{errors.password}</p>}
                </div>
                {/* Role Selection */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='role'>Vai trò</label>
                    <div className='flex gap-2'>
                        {['user', 'owner', 'deliveryBoy'].map(((r) => (
                            <button className='cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors flex flex-col items-center gap-2'
                                key={r}
                                onClick={() => setRole(r)}
                                style={
                                    role == r ? { backgroundColor: primaryColor, color: 'white', border: `1px solid ${primaryColor}` }
                                        : { backgroundColor: 'white', color: 'black', border: `1px solid ${borderColor}` }
                                }
                            >
                                <div className='text-xl'>
                                    {r === 'user' ? <FaUser size={20} /> : r === 'owner' ? <FaStore size={20} /> : <FaTruck size={20} />}
                                </div>
                                <span>{r === 'user' ? 'Người dùng' : r === 'owner' ? 'Chủ shop' : 'Shipper'}</span>
                            </button>
                        )))}
                    </div>
                </div>

                <button disabled={loading} onClick={handleSignUp} className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} >
                    {loading ? <ClipLoader size={25} color='white' /> : 'Đăng ký'}
                </button>

                <button
                    onClick={handleGoogleAuth}
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={20} />
                    <span>Đăng ký bằng tài khoản google</span>
                </button>
                <p onClick={() => navigate('/signin')} className='text-center mt-6 cursor-pointer'>Đã có tài khoản rồi ? <span className='text-[#ff4d2d]'>Đăng nhập</span></p>
            </div>
        </div>
    )
}

export default SignUp