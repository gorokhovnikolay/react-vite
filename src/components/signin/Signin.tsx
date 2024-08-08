import { useState, useRef, MutableRefObject } from 'react'
import { EmailIcon, PasswordIcon } from '../../assets/icons'
import { Link } from 'react-router-dom'
import { IValues } from '../../pages'
import { Button, Card, Container, Fieldset, Group, TextInput } from '@mantine/core'

interface Submit {
    onSubmit: (values: IValues) => void
}

export const Signin: React.FC<Submit> = ({ onSubmit }) => {
    const [values, setValues] = useState({ email: '', password: '' })
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
        setValues({ email: '', password: '' })
    }

    return (
        <Container size='xs'>
            <Card shadow='sm' padding='lg' radius='md' withBorder>
                <form
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onReset={handleReset}
                    ref={formRef}
                >
                    <Fieldset legend='Signin'>
                        <TextInput
                            leftSection={<EmailIcon />}
                            label='Email'
                            name='email'
                            placeholder='Your name'
                            type='email'
                            required={true}
                        />
                        <TextInput
                            leftSection={<PasswordIcon />}
                            label='password'
                            placeholder='password'
                            mt='md'
                            type='password'
                            required={true}
                        />
                    </Fieldset>
                    <Group my='10px' justify='space-around'>
                        <Button type='submit'>Войти</Button>
                        <Button type='reset'>Сбросить</Button>
                        <Link to='/register'>Зарегистрироваться</Link>
                    </Group>
                </form>
            </Card>
        </Container>
    )
}
