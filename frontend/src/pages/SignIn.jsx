import axios from 'axios'
import { useState } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {
    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // State cho validation errors
    const [errors, setErrors] = useState({
        email: '',
        password: ''
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
            case 'password':
                if (!value) {
                    error = 'Vui lòng nhập mật khẩu.'
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
        if (fieldName === 'email') setEmail(value)
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
            email: validateField('email', email),
            password: validateField('password', password)
        }

        setErrors(newErrors)

        // Nếu tất cả fields bỏ trống
        if (!email && !password) {
            toast.error('Vui lòng điền email và mật khẩu.', {
                position: 'top-right',
                autoClose: 3000
            })
            return false
        }

        // Nếu có bất kỳ error nào
        return !Object.values(newErrors).some(error => error !== '')
    }

    const handleSignIn = async () => {
        if (!validateAllFields()) {
            return
        }

        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email,
                password
            }, {
                withCredentials: true
            })
            console.log(result)
            toast.success('Đăng nhập thành công!', {
                position: 'top-right',
                autoClose: 2000
            })
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000
            })
        }
    }

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                email: result.user.email,
            }, {
                withCredentials: true
            })
            toast.success('Đăng nhập Google thành công!', {
                position: 'top-right',
                autoClose: 2000
            })
            console.log(data)
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Đăng nhập Google thất bại.'
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
                <p className='text-gray-600 mb-8'> Đăng nhập tài khoản của bạn để bắt đầu với Vingo và đặt những món ăn ngon nhất.</p>

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
                <div onClick={() => navigate('/forgot-password')} className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer'>
                    Quên mật khẩu?
                </div>

                <button onClick={handleSignIn} className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} >
                    Đăng nhập
                </button>

                <button
                    onClick={handleGoogleAuth}
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={20} />
                    <span>Đăng nhập bằng tài khoản google</span>
                </button>
                <p onClick={() => navigate('/signup')} className='text-center mt-6 cursor-pointer'>Chưa có tài khoản ? <span className='text-[#ff4d2d]'>Đăng ký</span></p>
            </div>
        </div>
    )
}

export default SignIn