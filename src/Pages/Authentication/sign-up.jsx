import React from 'react'
import {useRef, useState, useEffect} from 'react'
import {faInfoCircle, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import {useAuth} from '../../Context/authContext'

import './login-signup.css'

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {

    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEMail] = useState('');
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEMailFocus] = useState(false)

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setValidName(USER_REGEX.test(user));
    },[user])

    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(email))
    },[email])

    useEffect(()=>{
        setValidPassword(PASSWORD_REGEX.test(password))
        const match = password === matchPassword;
        setValidMatchPassword(match)
    },[password, matchPassword])

    useEffect(()=>{
        setErrMsg('')
    },[email, password, matchPassword])

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        try{
            const response = await axios.post('/api/auth/signup',
                {
                    email,
                    password,
                    userName : user
                })
                console.log(response)
                if(response.status === 201){
                    localStorage.setItem("token", response.data.encodedToken);                  
                    setAuth({
                        token : response.data.encodedToken,
                        'isAuthorized' : true,
                        email,
                        userName : user
                    })
                    toast.success(`👋 Welcome aboard ${response.data.createdUser.userName}!`);
                    navigate('/home')
                }
        }
        catch(err){
            console.log(err)
            setErrMsg(err.response.data.errors[0])
        }
    }

  return (
            <section className="login__container">
                <div className="login__container--box">
                    <div className="login__form--container">
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
                        <form onSubmit={handleSubmit} className="input__container">
                            <label className="input__label input__label-required" htmlFor="input--user">
                                User Name : 
                                <span className= {validName ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} /></span>
                                <span className= {validName || !user ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                            </label>
                            <input 
                                className="input__field" 
                                type="text" 
                                placeholder="User name" 
                                id="input--user" 
                                ref={userRef}
                                autoComplete="off"
                                onChange={((e) => setUser(e.target.value))}
                                value={user}
                                aria-invalid = {validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                required 
                            />
                            <p id = "uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                4 to 24 characters. <br/>
                                Must begin with a letter. <br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label className="input__label input__label-required" htmlFor="input--email">
                                E-mail ID : 
                                <span className= {validEmail ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} /></span>
                                <span className= {validEmail || !email ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                            </label>
                            <input 
                                className="input__field" 
                                type="email" 
                                placeholder="youremail@email.com" 
                                id="input--email" 
                                autoComplete="off"
                                onChange={((e) => setEMail(e.target.value))}
                                value={email}
                                required 
                                aria-invalid = {validEmail ? "false" : "true"}
                                aria-describedby="emailidnote"
                                onFocus={() => setEMailFocus(true)}
                                onBlur={() => setEMailFocus(false)}
                            />
                            <p id = "emailidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                Enter valid E-email ID
                            </p>

                            <label className="input__label input__label-required" htmlFor="input--password">
                                Create Password : 
                                <span className= {validPassword ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} /></span>
                                <span className= {validPassword || !password ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                            </label>
                            <input 
                                className="input__field" 
                                type="password" 
                                placeholder="create password" 
                                id="input--password" 
                                onChange={((e) => setPassword(e.target.value))}
                                value={password}
                                required 
                                aria-invalid = {validPassword ? "false" : "true"}
                                aria-describedby="passwordnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id = "passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                8 to Maximum 24 characters <br/>
                                Must include uppercase & lowercase letters, a digit & a special character <br/>
                            </p>
                                
                            <label className="input__label input__label-required" htmlFor="input--matchPassword">
                                Confirm Password : 
                                <span className= {validMatchPassword && matchPassword ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} /></span>
                                <span className= {validMatchPassword || !matchPassword ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                            </label>
                            <input 
                                className="input__field" 
                                type="password" 
                                placeholder="create password" 
                                id="input--matchPassword" 
                                onChange={((e) => setMatchPassword(e.target.value))}
                                value={matchPassword}
                                aria-invalid = {validMatchPassword ? "false" : "true"}
                                aria-describedby="matchPasswordnote"
                                onFocus={() => setMatchPasswordFocus(true)}
                                onBlur={() => setMatchPasswordFocus(false)}
                                required 
                            />
                            <p id = "matchPasswordnote" className={matchPasswordFocus && matchPassword && !validMatchPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                Passwords must match
                            </p>
                            <button
                                disabled={!validName || !validEmail || !validMatchPassword || !validPassword ? true : false}
                                className={!validName || !validEmail || !validMatchPassword || !validPassword ? "main--btn disabled btn  btn__primary" : "main--btn btn  btn__primary btn__primary--animated"}
                                >
                                Sign Up
                                </button>
                        </form>
                    <div className="secondary--action">
                        <span>Already have an account?</span>
                        <Link to='/login-page' className="btn btn__underlined btn__underlined--animated">
                            Sign in <i className="fas fa-chevron-right btn__icon-right"></i>
                        </Link>
                    </div>
                    </div>
                </div>
            </section>
  )
}

export default SignUp