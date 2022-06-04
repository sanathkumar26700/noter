const dataReducer = (state, action) =>{
    switch(action.type){

   case "LOAD_DATA" : return {...state, isLoading: action.payload.isLoading, tags : [...action.payload.tags]}

   case "HIGH_TO_LOW" : return{ ...state, priority : action.type}

   case "LOW_TO_HIGH" : return{ ...state, priority : action.type}

   case "NEW_TO_OLD" : return{ ...state, createdTime : action.type}

   case "OLD_TO_NEW" : return{ ...state, createdTime : action.type}

   case "SORT_BY_TAGS" :  return {...state, selectedTags : [...action.payload] }

   case "SEARCH" : return {...state, searchFor : action.payload}

   case "CLEAR"   : return {...state,                           
                              createdTime : "",
                              priority : "",
                              selectedTags : [],
                              searchFor : ""
                        }

   default : return state
 }
}

export {dataReducer}