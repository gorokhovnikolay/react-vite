import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/context-provider/context-provider'

export const PrivatRoute = ({ children }: { children: ReactElement }) => {
    const user = useAuth()
    const location = useLocation()

    if (user.user === '') {
        return <Navigate to='/login' state={{ from: location.pathname }} replace />
    }
    return children
}
