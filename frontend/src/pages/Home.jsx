import { useSelector } from "react-redux"
import UserDashboard from "../components/UserDashBoard.jsx"
import OwnerDashboard from "../components/OwnerDashboard.jsx"
import DeliveryBoy from '../components/DeliveryBoy.jsx'
import Nav from "../components/Nav.jsx"

const Home = () => {
    const { userData } = useSelector(state => state.user)
    return (
        <div className="w-full h-full min-h-screen pt-[100px] flex flex-col items-center bg-[#fff9f6]">
            {userData.user.role == 'user' && <UserDashboard />}
            {userData.user.role == 'owner' && <OwnerDashboard />}
            {userData.user.role == 'deliveryBoy' && <DeliveryBoy />}
        </div>
    )
}

export default Home