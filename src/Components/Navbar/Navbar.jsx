import { Link} from 'react-router-dom';
import {useAuth} from '../../Context/authContext'
import { toast } from "react-toastify";
import DarkModeButton from '../Dark mode/darkMode.jsx'
import { useUserData } from '../../Context/userDataContext'

import "./navbar.css";

function Navbar() {
    
    const {auth:{isAuthorized}, setAuth} = useAuth()
    const { userData : {notesData}  } = useUserData()

    const handleLogout = () =>{
        localStorage.removeItem('token')
        setAuth({
            token : '',
            isAuthenticated : false
        })
        toast.success('Logged out successfully !') 
    }

  return (
        <nav className="nav__container bottom-shadow">
            <div className=" logo ">
                <Link to="/home" className="anchor-style--none">
                    <span className="logo--title logo--title-black ">note<span className="dot ">r</span>
                    <img src="https://icons.iconarchive.com/icons/martz90/circle-addon2/256/notepad-icon.png" alt=" noter--logo" className="logo--img img-responsive"/>
                    </span>
                </Link>
            </div>

            <nav className="nav__container--nav-list">
                <ul className="list-bulletless social-links">

                    <li>
                        <Link to="/notes" className="nav-list--item">
                            <div className="nav-list--item__icon--wrapper">
                                <span>
                                    <i className="fas icon fa-file-alt">
                                        {isAuthorized  && <span className="status-badge notification-badge">{notesData.length}</span>}
                                    </i>
                                </span>
                                <span className="icon--text">Notes</span>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="/archives" className="nav-list--item">
                            <div className="nav-list--item__icon--wrapper">
                                <span>
                                        <i className="fas icon fa-archive">
                                            {isAuthorized  && <span className="status-badge notification-badge">{'0'}</span>}
                                        </i>
                                </span>
                                <span className="icon--text">Archives</span>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="/trash" className="nav-list--item">
                            <div className="nav-list--item__icon--wrapper">
                                <span>
                                        <i className="fas icon fa-trash">
                                            {isAuthorized  && <span className="status-badge notification-badge">{'0'}</span>}
                                        </i>
                                </span>
                                <span className="icon--text">Trash</span>
                            </div>
                        </Link>
                    </li>

                    {isAuthorized ? 
                    (<li>
                        <div onClick = {handleLogout} className="nav-list--item__icon--wrapper">
                            <span  className="nav-items btn btn__primary btn__primary--animated">Log Out</span>
                        </div>
                    </li>)
                    :
                    (<li>
                        <Link to="/login-page" className="nav-list--item">
                            <div className="nav-list--item__icon--wrapper">
                                <span  className="nav-items btn btn__primary btn__primary--animated">Login</span>
                            </div>
                        </Link>
                    </li>)}
                    <li>
                        <DarkModeButton/>
                    </li>

                </ul>
            </nav>
        </nav>
  )
}

export default Navbar