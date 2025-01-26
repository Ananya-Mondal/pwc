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
import UserProduct from './UserProduct'
import BuyProduct from './BuyProduct'
import UserProductEdit from './UserProductEdit'
import Users from './Users'
import AddUser from './AddUser'
import EditUser from './EditUser'
import ShowProduct from './ShowProduct'
import ViewCart from './ViewCart'
import ViewOrder from './ViewOrder'
import ViewOrderProduct from './ViewOrderProduct'




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
        <Route path='/Users' element={<Users/>} />
        <Route path='/AddProduct' element={<Create/>} />
        <Route path='/EditProduct' element={<Edit/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/UserProduct' element={<UserProduct/>} />
        <Route path='/BuyProduct' element={<BuyProduct/>} />
        <Route path='/UserProductEdit' element={<UserProductEdit/>} />
        <Route path='/AddUser' element={<AddUser/>} />
        <Route path='/EditUser' element={<EditUser/>} />
        <Route path='/ShowProduct' element={<ShowProduct/>} />
        <Route path='/ViewCart' element={<ViewCart/>} />
        <Route path='/ViewOrder' element={<ViewOrder/>} />
        <Route path='/ViewOrderProduct' element={<ViewOrderProduct/>} />

        


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
