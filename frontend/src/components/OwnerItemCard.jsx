import React from 'react'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

const OwnerItemCard = ({ data }) => {
    return (
        <div className='flex h-30 bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d]
        w-full max-w-2xl hover:bg-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='w-32 h-full shrink-0 bg-gray-50'>
                <img src={data.image} alt={data.name} className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col justify-between p-3 flex-1'>
                <div className=''>
                    <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
                    <p ><span className='font-medium text-gray-70'>Loại món:</span>{data.category}</p>
                    <p><span className='font-medium text-gray-70'>Chay:</span> {data.foodType === 'veg' ? 'Có' : 'Không'}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <div><span className='font-medium text-gray-70'>Giá:</span>{data.price}₫</div>
                    <div className='flex items-center'>
                        <FaPen size={18} className='hover:text-[#ff4d2d] mt-2 cursor-pointer' />
                        <FaTrashAlt size={18} className='hover:text-red-600 mt-2 cursor-pointer ml-4' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerItemCard