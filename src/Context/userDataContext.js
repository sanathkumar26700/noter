import { createContext, useContext, useReducer, useEffect} from 'react';
import {userDataReducer} from '../Reducers/userDataReducer'
import {getArchivesHandler} from '../Utilities/JS/Data Handlers/archivesDataHandler'
import {getNotesHandler} from '../Utilities/JS/Data Handlers/notesDataHandler'
import { getTrashHandler } from '../Utilities/JS/Data Handlers/trashDataHandler';
import {useAuth} from './authContext'

const userDataContext = createContext({})

function UserDataProvider({children}) {

    const {auth : {token, isAuthorized}} = useAuth();

    const [userData, userDataDispatch] = useReducer(userDataReducer, 
        {   
            notesData : [],
            archivesData : [],
            trashData : [],
            isLoading : false
        })

    useEffect(() =>{
        if(isAuthorized){
            getNotesHandler(token, userDataDispatch)    
            getArchivesHandler(token, userDataDispatch) 
            getTrashHandler(token, userDataDispatch)                 
        }
    },[isAuthorized,token])

  return (
    <userDataContext.Provider value ={{userData, userDataDispatch}}>
        {children}
    </userDataContext.Provider>
  )
}

const useUserData = () => useContext(userDataContext)

export {UserDataProvider, useUserData}