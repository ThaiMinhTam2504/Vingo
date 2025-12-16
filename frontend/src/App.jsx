import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity.jsx'
import useGetMyShop from './hooks/useGetMyShop.jsx'
import CreateEditShop from './pages/CreateEditShop.jsx'
export const serverUrl = "http://localhost:8000"

const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const { userData } = useSelector(state => state.user)
  const { myShopData } = useSelector(state => state.owner)
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/signin" />} />

      <Route path='/create-edit-shop' element={<CreateEditShop />} />

    </Routes>
  )
}

export default App