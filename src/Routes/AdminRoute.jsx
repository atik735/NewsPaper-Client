import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
  const [role,isRoleLoading] = useRole()

  if (isRoleLoading) return <h1>Loading ........</h1>
  if (role === 'admin') return children
  return <Navigate to='/'/>
}

export default AdminRoute
