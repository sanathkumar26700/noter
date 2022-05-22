import React from 'react'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useAuth} from '../../Context/authContext'
import { toast } from "react-toastify";

import './login-signup.css'


function Login() {
    const {setAuth} = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/home"

    const emailRef = useRef()
    const passwordRef = useRef()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        emailRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg("")
    },[email, password])

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token' , response?.data?.encodedToken)
            setAuth({
                token : response?.data?.encodedToken,
                 "isAuthorized" : true
            })
            toast.success(`👋 Welcome back ${response.data.foundUser.userName}!`);
            navigate(from, {replace : true})
        }catch(err){
            console.log(err)
            setErrMsg(err.response.data.errors[0])
        }
    }

  return (
    <section className="login__container">
            <div className="login__container--box">
                <div className="login__form--container">
                <p className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
                    <form className="input__container">
                        <label className="input__label input__label-required" htmlFor="input--email">Email :</label>
                        <input 
                            ref={emailRef}
                            className="input__field" 
                            type="email" 
                            placeholder="yourmail@email.com" 
                            id="input--email"
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email} 
                            autoComplete="off"
                            required 
                        />
                        <label className="input__label input__label-required" htmlFor="input--password">Password :</label>
                        <input 
                            ref={passwordRef}
                            className="input__field" 
                            type="password" 
                            placeholder="enter password"  
                            id="input--password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} 
                            required 
                        />
                        <button
                            type="submit"
                            onClick={(e) => handleSubmit(e,email,password)}
                            className="main--btn btn btn__primary btn__primary--animated">
                            Login
                        </button>
                        <button 
                            type="submit"
                            onClick={(e) => handleSubmit(e,'guest@gmail.com','Guest@123')}
                            className="main--btn btn btn__primary btn__primary--animated">
                            Login as guest
                        </button>
                    </form>
                    <div className="secondary--action">
                        <span>Don't have an account?</span>
                        <Link to="/signup-page" className="btn btn__underlined btn__underlined--animated">
	                    sign up <i className="fas fa-chevron-right btn__icon-right"></i>
                    </Link>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Login