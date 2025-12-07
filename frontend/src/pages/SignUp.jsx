import React from 'react'

const SignUp = () => {
    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64323"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-[${borderColor}]`}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
                <p className='text-gray-600 mb-8'>Hãy tạo tài khoản của bạn để bắt đầu với Vingo để đặt những món ăn ngon nhất.</p>
                {/* Fullname */}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor='fullName'>Họ tên</label>
                    <input type='text'></input>
                </div>
            </div>
        </div>
    )
}

export default SignUp