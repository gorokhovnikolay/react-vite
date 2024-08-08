import { Box, Button, Flex } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/context-provider/context-provider'
import Logo from '../../assets/logo.png'

export const Header = () => {
    const { user, signup } = useAuth()
    const navigation = useNavigate()

    return (
        <>
            <Flex
                gap='md'
                px='25px'
                justify='space-between'
                align='center'
                direction='row'
                wrap='wrap'
            >
                <Box w='200px'>
                    <Link to='/'>
                        <img height='100px' src={Logo} alt='logo' />
                    </Link>
                </Box>

                {user !== '' ? (
                    <Button
                        onClick={() =>
                            signup(() => {
                                navigation('/')
                            })
                        }
                    >
                        {user}
                    </Button>
                ) : (
                    <Link to='/login'>
                        <Button variant='filled' size='xs' radius='md'>
                            Вход
                        </Button>
                    </Link>
                )}
            </Flex>
        </>
    )
}
