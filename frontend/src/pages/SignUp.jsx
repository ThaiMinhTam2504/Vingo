import React, { useState } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'

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

    const handleSignUp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName,
                email,
                password,
                mobile,
                role
            }, { withCredentials: true })
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-[${borderColor}]`}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
                <p className='text-gray-600 mb-8'>Hãy tạo tài khoản của bạn để bắt đầu với Vingo và đặt những món ăn ngon nhất.</p>
                {/* Fullname */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='fullName'>Họ tên</label>
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Điền tên của bạn' style={{ border: `1px solid ${borderColor}` }} >
                    </input>
                </div>
                {/* Email */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Điền email của bạn' style={{ border: `1px solid ${borderColor}` }} >
                    </input>
                </div>
                {/*mobile*/}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='mobile'>Số điện thoại</label>
                    <input onChange={(e) => setMobile(e.target.value)} value={mobile} type='tel' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Điền số điện thoại của bạn' style={{ border: `1px solid ${borderColor}` }} >
                    </input>
                </div>
                {/* Password */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='password'>Mật khẩu</label>
                    <div className='relative'>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Điền mật khẩu của bạn' style={{ border: `1px solid ${borderColor}` }} >
                        </input>
                        <button onClick={() => setShowPassword(prev => !prev)} className='absolute cursor-pointer right-3 top-3.5 text-gray-500'>{!showPassword ? <FaEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>
                {/* Role Selection */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='role'>Vai trò</label>
                    <div className='flex gap-2'>
                        {['user', 'owner', 'deliveryBoy'].map(((r) => (
                            <button className=' cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors'
                                onClick={() => setRole(r)}
                                style={
                                    role == r ? { backgroundColor: primaryColor, color: 'white', border: `1px solid ${primaryColor}` }
                                        : { backgroundColor: 'white', color: 'black', border: `1px solid ${borderColor}` }
                                }>{r === 'user' ? 'Người dùng' : r === 'owner' ? 'Chủ shop' : 'Shipper'}</button>
                        )))}
                    </div>
                </div>

                <button onClick={handleSignUp} className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} >
                    Đăng ký
                </button>
                <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={20} />
                    <span>Đăng ký bằng tài khoản google</span>
                </button>
                <p onClick={() => navigate('/signin')} className='text-center mt-6 cursor-pointer'>Đã có tài khoản rồi ? <span className='text-[#ff4d2d]'>Đăng nhập</span></p>
            </div>
        </div>
    )
}

export default SignUp