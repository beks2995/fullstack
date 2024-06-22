
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Main from './pages/Main'
import AddProduct from './pages/AddProduct'
import EditProductList from './pages/EditProductList'

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/add' element={<AddProduct/>}/>
                <Route path='/edit' element={<EditProductList/>}/>
            </Routes>
        </div>
    )
}

export default App