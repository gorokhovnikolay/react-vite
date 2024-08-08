import { Signin } from '../../components/signin'

export const Register = () => {
    const onSubmit = () => {}
    return (
        <div className='container'>
            <Signin onSubmit={onSubmit} />
        </div>
    )
}
