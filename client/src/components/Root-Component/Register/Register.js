import '../LogIn2/Login2.css'

import React from 'react'
import { CForm, CFormInput, CCol, CButton } from '@coreui/react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({showLogin, setShowLogin}) => {

    const [regForm, setRegForm] = useState({ username: "", email: "", password: "" })
    const [err, setErr] = useState("")
    const handleRegForm = (params) => (e) => {
        setRegForm({ ...regForm, [params]: e.target.value })
        // console.log(e.target.value)
        setErr("")
    }

    const submitRegister = async (e) => {
        e.preventDefault()
        if(!regForm.username || !regForm.email || !regForm.password){
           return toast.error("All the fields are Mandatory!")
        }
        await axios.post('https://cuba-goa-2lad.onrender.com/register', regForm)
            .then((response) => {
                console.log(response.data)
                setShowLogin(true)
            })
            .catch((err) => {
                console.log(err.response.data.message)
                setErr(err.response.data.message)
            })
    }

    return (
        <section className='log-in' >
            <CForm className='login-form' onSubmit={(e) => {
                e.target.preventDefault()
            }

            }>

                <CCol className='my-2'>
                    <CFormInput type='text' placeholder='username' onChange={handleRegForm('username')} />
                </CCol>
                <CCol className='my-2'>
                    <CFormInput type='email' placeholder='email' onChange={handleRegForm('email')} />
                </CCol>
                <CCol className='my-2'>
                    <CFormInput type='password' placeholder='password' onChange={handleRegForm('password')} />
                </CCol>
                <CCol className='login-err'>{err}</CCol>
                <CCol>
                    <CButton type='submit' onClick={submitRegister} >Login</CButton>
                </CCol>
                <CCol className="already-have-an-account">
                    Already have an account? 
                    <span className='regiser-span' onClick={() => setShowLogin(true)}> login</span>
                </CCol>
            </CForm>
            <ToastContainer 
               autoClose={1500}
               limit={5}
               theme={"dark"}
               pauseOnFocusLoss={false}
               position={"top-center"}
            />
        </section>
    )
}

export default Register;
