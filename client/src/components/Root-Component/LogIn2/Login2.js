import React from 'react'
import { CForm, CFormInput, CCol, CButton } from '@coreui/react'
import { useState, useEffect } from 'react'
import './Login2.css'
import { useNavigate } from 'react-router'
import axios from 'axios';

const Login2 = ({showLogin, setShowLogin}) => {

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate() 

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [err, setErr] = useState("")
  const handleLoginForm = (params) => (e) => {
    setLoginForm({ ...loginForm, [params]: e.target.value })
    // console.log(e.target.value)
    setErr("")
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    await axios.post('https://cuba-goa-2lad.onrender.com/login', loginForm)
      .then((response) => {
        console.log(response.data)
        // console.log(response.data.username)
        // console.log(response.data.token)
        localStorage.setItem('user-info', JSON.stringify(response.data))
        navigate('/')
      })
      .catch((err) => {
        // console.log(err.response.data.message)
        setErr(err.response.data.message)
      })
  }

  // async function login() {
  //     if (email !== '' || password !== '') {
  //       let item = { email, password,userName: email.split('@')[0]+"CubGoa"}
  //       // let result = await fetch("https://cuba-goa-z4hl.onrender.com/login", {
  //       let result = await fetch("http://localhost:4001/login", {
  //         method: "POST",
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(item)
  //       })
  //       result = await result.json()
  //       console.log(result)
  //       localStorage.setItem('user-info', JSON.stringify(result))
  //       let user = JSON.parse(localStorage.getItem('user-info'))
  //       console.log(user)
  //       if (user?.user) {
  //         navigate('/')
  //       }         
  //     }
  //   } 


  // useEffect(()=>{
  //     let user = JSON.parse(localStorage.getItem('user-info'))
  //     if(user?.user){
  //         navigate('/')
  //         return
  //     }
  //     localStorage.clear()
  //     console.log(user)
  // },[])

  return (
    <section className='log-in' >
      <CForm className='login-form' onSubmit={(e) => {
        e.target.preventDefault()
      }

      }>

        <CCol className='my-2'>
          <CFormInput type='email' placeholder='email' onChange={handleLoginForm('email')} />
        </CCol>
        <CCol className='my-2'>
          <CFormInput type='password' placeholder='password' onChange={handleLoginForm('password')} />
        </CCol>
        <CCol className='login-err'>{err}</CCol>
        <CCol>
          <CButton type='submit' onClick={submitLogin} >Login</CButton>
        </CCol>
        <CCol className="already-have-an-account">
          Don't have account? 
          <span className='regiser-span' onClick={() =>  setShowLogin(false)}> register</span>
        </CCol>
      </CForm>
    </section>
  )
}

export default Login2
