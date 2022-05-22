import { createContext, useState, useContext } from "react"

const authContext = createContext({})

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=>{
        const token = localStorage.getItem('token')
        if(token){
            return { token, "isAuthorized" : true}
        }else{
            return {token : '', "isAuthorized" : false}
        }
    })

    return (
        <authContext.Provider value={{auth, setAuth}}>
                {children} 
        </authContext.Provider>
    )
}
const useAuth = () => useContext(authContext);

export {useAuth, AuthProvider}