import {useAuthStore} from "../../store/authStore"
import HomeScreen from "./HomeScreen"
import AuthScreen from "./AuthScreen"


const HomePage = () => {
  const {user} = useAuthStore()

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>
}

export default HomePage
