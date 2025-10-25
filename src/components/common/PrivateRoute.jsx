import { Navigate } from 'react-router-dom'
import useUserStore from '../../store/user.store'

const PrivateRoute = ({ children }) => {
  const user = useUserStore(state => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
