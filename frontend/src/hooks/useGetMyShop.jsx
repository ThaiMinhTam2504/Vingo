import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'

const useGetMyShop = () => {
    const dispatch = useDispatch()
    return (
        useEffect(() => {
            const fetchShop = async () => {
                try {
                    const result = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true })
                    dispatch(setMyShopData(result.data))
                } catch (err) {
                    console.log(err)
                }
            }
            fetchShop()
        }, [])
    )
}

export default useGetMyShop