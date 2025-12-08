import axios from 'axios'
import { useState } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'

const SignIn = () => {
    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email,
                password
            }, {
                withCredentials: true
            })
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-[${borderColor}]`}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
                <p className='text-gray-600 mb-8'> Đăng nhập tài khoản của bạn để bắt đầu với Vingo và đặt những món ăn ngon nhất.</p>

                {/* Email */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Điền email của bạn' style={{ border: `1px solid ${borderColor}` }} >
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
                <div onClick={() => navigate('/forgot-password')} className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer'>
                    Quên mật khẩu?
                </div>


                <button onClick={handleSignIn} className={`w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} >
                    Đăng nhập
                </button>
                <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={20} />
                    <span>Đăng nhập bằng tài khoản google</span>
                </button>
                <p onClick={() => navigate('/signup')} className='text-center mt-6 cursor-pointer'>Chưa có tài khoản ? <span className='text-[#ff4d2d]'>Đăng ký</span></p>
            </div>
        </div>
    )
}

export default SignIn