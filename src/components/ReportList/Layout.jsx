import { useEffect } from 'react'
import { useCitizenMeQuery } from '../../hooks/query/auth.query'
import useUserStore from '../../store/user.store'

const Layout = ({ children }) => {
  const { data } = useCitizenMeQuery()
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    if (data?.data) {
      setUser(data.data)
    }
  }, [data, setUser])

  return children
}

export default Layout
