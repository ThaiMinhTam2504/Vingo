import { useSelector } from "react-redux"
import UserDashboard from "../components/UserDashBoard.jsx"
import OwnerDashboard from "../components/OwnerDashboard.jsx"
import DeliveryBoy from '../components/DeliveryBoy.jsx'
import Nav from "../components/Nav.jsx"

const Home = () => {
    const { userData } = useSelector(state => state.user)
    const showClg = () => {
        console.log('userData:', userData);
        console.log('role', userData.user.role);
    }
    return (
        <div className="w-[100vm] m-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
            <h3 onClick={showClg}>HOME PAGE</h3>
            {/* <Nav /> */}
            {userData.user.role == 'user' && <UserDashboard />}
            {userData.user.role == 'owner' && <OwnerDashboard />}
            {userData.user.role == 'deliveryBoy' && <DeliveryBoy />}
        </div>
    )
}

export default Home