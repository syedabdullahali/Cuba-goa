import React from 'react'
import { CForm ,CFormInput,CCol, CButton} from '@coreui/react'
import { useState,useEffect } from 'react'
import './Login2.css'
import { useNavigate } from 'react-router'
const Login2 = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate() 
     

    async function login() {
        if (email !== '' || password !== '') {
          let item = { email, password,userName: email.split('@')[0]+"CubGoa"}
          let result = await fetch("https://allapiresort-w3ql.vercel.app/login", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
          })
          result = await result.json()
          console.log(result)
          localStorage.setItem('user-info', JSON.stringify(result))
          let user = JSON.parse(localStorage.getItem('user-info'))
          console.log(user)
          if (user?.user) {
            navigate('/')
          }         
        }
      } 


useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('user-info'))
    if(user?.user){
        navigate('/')
        return
    }
    localStorage.clear()
    console.log(user)
},[])

  return (
    <section className='log-in' >
    <CForm className='login-form'onSubmit={(e)=>{
        e.target.preventDefault()
    }
        
    }>

        <CCol className='my-2'>
        <CFormInput type='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
        </CCol>
        <CCol  className='my-2'>
        <CFormInput type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </CCol>
        <CCol>
            <CButton onClick={login} >Login</CButton>
        </CCol>
    </CForm>
</section>
  )
}

export default Login2
