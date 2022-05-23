import {Routes, Route} from "react-router-dom"; 
import Home from '../Pages/Home/Home'
import Notes from "../Pages/Notes/notes"
import Trash from "../Pages/Trash/trash";
import Archives from "../Pages/Archives/archives";
import Login from "../Pages/Authentication/login-page";
import SignUp from "../Pages/Authentication/sign-up";
import AuthorizedRoutes from "../Routes/authorized-routes"

function NavBarRoutes() {
    return (
    <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/home" element={<Home/>}/>
        <Route path = "/login-page" element={<Login/>}/>
        <Route path = "/signup-page" element={<SignUp/>}/>

        <Route element = {<AuthorizedRoutes/>}>
            <Route path = "/notes" element={<Notes/>}/>
            <Route path = "/trash" element={<Trash/>}/>
            <Route path = "/archives" element={<Archives/>}/>
        </Route>

    </Routes>
    );
}

export default NavBarRoutes;