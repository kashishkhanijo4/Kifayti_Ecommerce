import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Footer from './Footer'
import About from './About'
import Contact from './Contact'
import Error from './Error'
import Shop from './Shop'
import SingleProduct from './SingleProduct'


import AdminHome from './Admin/AdminHome'

import Maincategory from './Admin/Maincategory/Maincategory'
import CreateMaincategory from './Admin/Maincategory/CreateMaincategory'
import UpdateMaincategory from './Admin/Maincategory/UpdateMaincategory'

import Subcategory from './Admin/Subcategory/Subcategory'
import CreateSubcategory from './Admin/Subcategory/CreateSubcategory'
import UpdateSubcategory from './Admin/Subcategory/UpdateSubcategory'

import Brand from './Admin/Brand/Brand'
import CreateBrand from './Admin/Brand/CreateBrand'
import UpdateBrand from './Admin/Brand/UpdateBrand'

import Product from './Admin/Product/Product'
import CreateProduct from './Admin/Product/CreateProduct'
import UpdateProduct from './Admin/Product/UpdateProduct'

import User from './Admin/User/User'

import Testimonial from './Admin/Testimonial/Testimonial'
import CreateTestimonial from './Admin/Testimonial/CreateTestimonial'
import UpdateTestimonial from './Admin/Testimonial/UpdateTestimonial'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'

export default function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/product/:id' element={<SingleProduct/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />

            <Route path='/profile' element={<Profile/>} />
            <Route path='/update-profile' element={<UpdateProfile/>} />
            
            <Route path='/admin' element={<AdminHome/>} />

            <Route path='/admin/maincategory' element={<Maincategory/>} />
            <Route path='/admin/maincategory/create' element={<CreateMaincategory/>} />
            <Route path='/admin/maincategory/update/:id' element={<UpdateMaincategory/>} />

            <Route path='/admin/subcategory' element={<Subcategory/>} />
            <Route path='/admin/subcategory/create' element={<CreateSubcategory/>} />
            <Route path='/admin/subcategory/update/:id' element={<UpdateSubcategory/>} />

            <Route path='/admin/brand' element={<Brand/>} />
            <Route path='/admin/brand/create' element={<CreateBrand/>} />
            <Route path='/admin/brand/update/:id' element={<UpdateBrand/>} />

            <Route path='/admin/product' element={<Product/>} />
            <Route path='/admin/product/create' element={<CreateProduct/>} />
            <Route path='/admin/product/update/:id' element={<UpdateProduct/>} />
            
            <Route path='/admin/users' element={<User/>} />

            <Route path='/admin/testimonial' element={<Testimonial/>} />
            <Route path='/admin/testimonial/create' element={<CreateTestimonial/>} />
            <Route path='/admin/testimonial/update/:id' element={<UpdateTestimonial/>} />
            
            <Route path='/*' element={<Error/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
