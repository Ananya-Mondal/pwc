import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './Menu'
import Home from './Home'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import SignUp from './SignUp'
import Login from './Login'
import Product from './Product'
import Create from './Create'
import Edit from './Edit'
import Profile from './Profile'



function App() {
 
  return (
    <>
      <BrowserRouter>
      <Menu/>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/AboutUs' element={<AboutUs/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Product' element={<Product/>} />
        <Route path='/AddProduct' element={<Create/>} />
        <Route path='/EditProduct' element={<Edit/>} />
        <Route path='/Profile' element={<Profile/>} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
