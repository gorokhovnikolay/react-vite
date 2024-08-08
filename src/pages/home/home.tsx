import { useState } from 'react'
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import ErrorBoundary from '../../components/error-boundery/ErrorBoundary'
import { AppShell, Button, Container, Divider, Flex, Title } from '@mantine/core'
import { Header } from '../../components/header/header'
import { Carousel } from '@mantine/carousel'
import styles from './home.module.css'
import '@mantine/carousel/styles.css'
import Slide1 from '../../assets/slider/1.jpg'
import Slide2 from '../../assets/slider/2.jpg'
import Slide3 from '../../assets/slider/3.jpg'

const buttons = [
    { id: '1', to: '/character', label: 'Герои' },
    { id: '2', to: '/location', label: 'Места' },
    { id: '3', to: '/episode', label: 'Эпизоды' },
]

export const Home = () => {
    const { pathname } = useLocation()
    const { category } = useParams()

    const [open, setOpen] = useState(true)
    return (
        <AppShell
            layout='alt'
            header={{
                height: 120,
                collapsed: !open,
            }}
            footer={{
                height: 120,
                collapsed: !open,
            }}
        >
            <AppShell.Header>
                <Container size='lg'>
                    <Header />
                </Container>
            </AppShell.Header>
            <AppShell.Main>
                <Container size='lg'>
                    <nav>
                        <Flex my='12px' justify='center' align='center'>
                            {buttons.map((button) => {
                                return (
                                    <NavLink
                                        key={button.id}
                                        className={styles.menuItem}
                                        to={button.to}
                                    >
                                        <Button
                                            className={
                                                '/' + category === button.to
                                                    ? styles.activeBtn
                                                    : styles.btn
                                            }
                                            id={button.id}
                                        >
                                            {button.label}
                                        </Button>
                                    </NavLink>
                                )
                            })}
                        </Flex>
                    </nav>
                    <Divider my='lg' />
                    {pathname === '/' && (
                        <>
                            <div>
                                <Title order={1}>
                                    Добро пожаловать в справочник по вселенной Рика и
                                    Морти
                                </Title>
                            </div>
                            <Carousel
                                classNames={{
                                    control: styles.mantineCarouselControl,
                                    indicator: styles.mantineCarouselIndicator,
                                }}
                                mt='25px'
                                withIndicators={true}
                                loop
                                height={600}
                            >
                                <Carousel.Slide>
                                    <img width='100%' src={Slide1} />
                                </Carousel.Slide>
                                <Carousel.Slide>
                                    <img width='100%' src={Slide2} />
                                </Carousel.Slide>
                                <Carousel.Slide>
                                    <img width='100%' src={Slide3} />
                                </Carousel.Slide>
                            </Carousel>
                        </>
                    )}

                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                    <div className={styles.btnFixed} onClick={() => setOpen((p) => !p)}>
                        <Button>
                            {open ? 'Скрыть шапку и подвал' : 'Показать шапку и подвал'}
                        </Button>
                    </div>
                </Container>
            </AppShell.Main>
            <AppShell.Footer></AppShell.Footer>
        </AppShell>
    )
}
