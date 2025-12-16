import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentCity, setCurrentState, setCurrentAddress } from "../redux/userSlice"

const useGetCity = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const apiKey = import.meta.env.VITE_GEOAPIKEY
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            // console.log(position)
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}
                &lon=${longitude}&format=json&apiKey=${apiKey}`)
            // console.log(result)

            // console.log(result.data.results[0].city)
            dispatch(setCurrentCity(result?.data?.results[0].city))
            // console.log(result.data.results[0].state)
            dispatch(setCurrentState(result?.data?.results[0].state))
            // console.log(result.data.results[0].formatted)
            dispatch(setCurrentAddress(result?.data?.results[0].formatted))
        })
    }, [userData])
}

export default useGetCity