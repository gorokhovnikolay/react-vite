import { createContext, ReactNode, useContext, useState } from 'react'

interface AuxProps {
    children: ReactNode
}
interface IUser {
    user: string
    signin: (user: string, fn: () => void) => void
    signup: (fn: () => void) => void
}

const AuthContext = createContext<IUser>({
    user: '',
    signin: () => {},
    signup: () => {},
})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuxProps) => {
    const [user, setUser] = useState('')

    const signin = (newUser: string, callback: () => void) => {
        setUser(newUser)
        callback()
    }
    const signup = (callback: () => void) => {
        setUser('')
        callback()
    }

    const value = {
        user,
        signin,
        signup,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
