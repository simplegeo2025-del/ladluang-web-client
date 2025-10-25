import { Navigate } from 'react-router-dom'
import useUserStore from '../../store/user.store'

const PublicRoute = ({ children }) => {
  const user = useUserStore(state => state.user)

  if (user) {
    return <Navigate to="/reports" replace />
  }

  return children
}

export default PublicRoute
