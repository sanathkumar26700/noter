import { createContext, useContext, useReducer } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {dataReducer} from '../Reducers/dataReducer'
import {useAuth} from './authContext'


const dataContext = createContext()

const DataContextProvider =({children}) =>{

    const {auth:{token}} = useAuth();

    const [state, dispatch] =  useReducer(dataReducer,
        {  data : [],
            createdTime : "",
            priority : "",
            isLoading: true,
            tags : [],
            selectedTags : [],
            reset : false,
            searchFor : ""
})
    
    useEffect(() =>{
        (async function(){
            try{
            let response = await axios.get('/api/notes', {
                headers: { authorization: token },
            });
            dispatch({type : "GET_DATA"})
            const notesList = response.data.notes.map((note) =>{
                return {...note}
            })
            console.log(notesList)

            dispatch({type : "LOAD_DATA", payload : {isLoading : false, notesList}})
            }catch(err){
                alert(err.message)
            }
        })();
    },[token])

    useEffect(() =>{
        (async function(){
            try{
            let response = await axios.get('/api/tags');
            dispatch({type : "GET_DATA"})
            const tags = response.data.tags
            dispatch({type : "LOAD_DATA", payload : {isLoading : false, tags}})
            console.log(tags)
            }catch(err){
                alert(err.message)
            }
        })();
    },[token])

    
   return(<dataContext.Provider value={{state, dispatch}}>{children}</dataContext.Provider>)
}
const useDataContext = () => useContext(dataContext);

export {useDataContext, DataContextProvider}
