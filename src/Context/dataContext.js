import { createContext, useContext, useReducer } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {dataReducer} from '../Reducers/dataReducer'

const dataContext = createContext()

const DataContextProvider =({children}) =>{

    const [data, dataDispatch] =  useReducer(dataReducer,
        {   
            createdTime : "",
            priority : "",
            isLoading: true,
            tags : [],
            selectedTags : [],
            searchFor : ""
        })
    
        useEffect(() =>{
        (async function(){
            try{
            let response = await axios.get('/api/tags');
            dataDispatch({type : "GET_DATA"})
            const tags = response.data.tags
            dataDispatch({type : "LOAD_DATA", payload : {isLoading : false, tags}})
            }catch(err){
                alert(err.message)
            }
        })();
    },[])
    
   return(<dataContext.Provider value={{data, dataDispatch}}>{children}</dataContext.Provider>)
}
const useDataContext = () => useContext(dataContext);

export {useDataContext, DataContextProvider}
