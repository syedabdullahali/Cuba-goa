import React, { useState } from 'react'
import Login2 from '../Root-Component/LogIn2/Login2';
import Register from '../Root-Component/Register/Register';


const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(true)
    return(
        <>
        {showLogin ? <Login2 showLogin={showLogin} setShowLogin={setShowLogin}/>
         : <Register showLogin={showLogin} setShowLogin={setShowLogin}/>}
        </>
    )
}

export default LandingPage;