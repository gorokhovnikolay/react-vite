import { useState, useRef, MutableRefObject } from 'react'
import {
    EmailIcon,
    PasswordIcon,
    UserIcon,
    NickNameIcon,
    ManIcon,
    WomanIcon,
} from '../../assets/icons'
import { TextInput } from '../text-input'
import { Link } from 'react-router-dom'
import { IValues } from '../../pages'

interface Submit {
    onSubmit: (values: IValues) => void
}

const initialState = { email: '', password: '', name: '', nikname: '' }

export const Signup: React.FC<Submit> = ({ onSubmit }) => {
    const [values, setValues] = useState(initialState)
    const formRef = useRef() as MutableRefObject<HTMLFormElement>

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(values)
        handleReset()
    }

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        const { name, value } = e.target as HTMLInputElement
        setValues({ ...values, [name]: value })
    }

    const handleReset = () => {
        formRef.current.reset()
        setValues(initialState)
    }

    return (
        <div className='form_container'>
            <h2>Signup</h2>
            <form
                onSubmit={handleSubmit}
                onChange={handleChange}
                onReset={handleReset}
                ref={formRef}
            >
                <TextInput
                    icon={<UserIcon />}
                    name='name'
                    label='name'
                    placeholder='Введите name'
                    type='text'
                />
                <TextInput
                    icon={<NickNameIcon />}
                    name='nikname'
                    label='nikname'
                    placeholder='Введите nikname'
                    type='text'
                />
                <TextInput
                    icon={<EmailIcon />}
                    name='email'
                    label='email'
                    placeholder='Введите email'
                    type='email'
                />
                <TextInput
                    icon={<ManIcon />}
                    name='gender'
                    label='man'
                    type='radio'
                    value='man'
                />
                <TextInput
                    icon={<WomanIcon />}
                    name='gender'
                    label='woman'
                    type='radio'
                    value='woman'
                />
                <TextInput
                    icon={<PasswordIcon />}
                    name='password'
                    label='password'
                    placeholder='Введите пароль'
                    type='password'
                />
                <TextInput
                    icon={<PasswordIcon />}
                    name='confirmPassword'
                    label='confirmPassword'
                    placeholder='Введите пароль еще раз'
                    type='password'
                />
                <button type='submit'>Войти</button>
                <button type='reset'>Сбросить</button>
                <Link to='/login'> Уже есть аккаунт</Link>
            </form>
        </div>
    )
}
