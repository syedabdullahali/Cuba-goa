import React, { useEffect } from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import { CButton } from '@coreui/react';



const Header = () => {

  const [hidenew,setNavBar] = useState(true)
  const location1 = useLocation()
  // let user = JSON.parse(localStorage.getItem('user-info'))
  const navigate = useNavigate()
  let user = JSON.parse(localStorage.getItem('user-info'))

  console.log(location1)


  useEffect(()=>{
     if(user?.username && location1!=='/'){
          return 
     } 

    if(user?.username  ){
      navigate('/')
      return
    }
navigate('/landing-page')
  },[])

function LogOut(){
localStorage.removeItem('user-info')
navigate('/landing-page')
}


  return (
    <>
   {/* <Navigate to={'/login2'} replace={true}></Navigate> */}

    <header className='main-header'>
       <div className='header-manue'>
        <button onClick={()=>setNavBar((val)=>!val)}>
          <AiOutlineMenu/>
        </button>
       </div>
        <nav className={hidenew?'main-nav deactive-nav':'main-nav'}>
            <NavLink to='/'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>HOME</span></NavLink>
            <NavLink to='/resorts' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>RESORTS</span></NavLink>
            <NavLink to='/our-properties'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>OUR PROPERTIES </span></NavLink>
            {/* <NavLink to='/forSale'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>FOR SALE</span></NavLink> */}
            <NavLink  to='/spa' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>SPA</span></NavLink>
            <NavLink to='/about' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>ABOUT</span></NavLink>
            <NavLink to='/contact-us'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>CONTACT US</span></NavLink>
            <NavLink to='/gallery'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>GALLERY</span></NavLink>
        
        <div className='ps-5 ms-5'>
          <CButton variant='outline' onClick={LogOut}  color='info' >Log Out</CButton>
        </div>   
        </nav>  
      
    </header>
    <Outlet/>
    </>
  )
}

export default Header
