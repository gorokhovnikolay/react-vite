import { Route, Routes } from 'react-router-dom'
import { NotFounde, Item, Login, Register, Home, Category } from './pages'
import { PrivatRoute } from './components/privat-route'

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                <Route
                    path=':category'
                    element={
                        <PrivatRoute>
                            <Category />
                        </PrivatRoute>
                    }
                />
                <Route
                    path=':category/:id'
                    element={
                        <PrivatRoute>
                            <Item />
                        </PrivatRoute>
                    }
                />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
            <Route path='*' element={<NotFounde />} />
        </Routes>
    )
}
export default App
