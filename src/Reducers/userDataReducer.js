 const userDataReducer = (state, action) => {
    switch(action.type){

        case "GET_DATA" : return {...state}

        case "SET_NOTES" : return {...state,  notesData : [...action.payload] }

        case "SET_ARCHIVES" : return {...state, archivesData : [...action.payload]}

        case "SET_TRASH" : return {...state, trashData : [...action.payload]}
        
        default : return {...state}
    }
}

export { userDataReducer }