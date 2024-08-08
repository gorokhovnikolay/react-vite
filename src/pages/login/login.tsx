import { useLocation, useNavigate } from 'react-router-dom'
import { Signin } from '../../components/signin'
import { useAuth } from '../../context/context-provider/context-provider'

export interface IValues {
    confirmPassword?: string
    email: string
    gender?: string
    name?: string
    nikname?: string
    password: string
}

export const Login = () => {
    const { signin } = useAuth()
    const location = useLocation()
    const navigation = useNavigate()
    const path = (location.state?.from as string) || '/'
    const onSubmit = (values: IValues) => {
        signin(values.email, () => {
            navigation(`${path}`, { replace: true })
        })
    }
    return <Signin onSubmit={onSubmit} />
}
