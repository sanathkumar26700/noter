   
const filterDataByPriority = (data, sortPriority) =>{
    const lowPriorityNotes = data.filter((note) => note.priority === "Low");
    const mediumPriorityNotes = data.filter((note) => note.priority === "Medium");
    const highPriorityNotes = data.filter((note) => note.priority === "High");
    if(sortPriority === "HIGH_TO_LOW"){ 
        return [...lowPriorityNotes, ...mediumPriorityNotes, ...highPriorityNotes];
    } else {
      return [...highPriorityNotes, ...mediumPriorityNotes, ...lowPriorityNotes];
    }
}

const filterDataByTime = (data, sortTime) =>{
    
    if(sortTime === "OLD_TO_NEW"){ 
        return [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    }else if(sortTime === "NEW_TO_OLD"){
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
    }else{
        return data
    }
}

const filterBySelectedTags = (data, selectedTags) => {
    if(!selectedTags.length){
        return data
    }else{    
    let selectedData = selectedTags.map(tag => data.filter(note => note.tag === tag))
    return selectedData.reduce((acc,curr)=>{
       return [...acc, ...curr]
    },[])
    }
}

const filterBySearch = (data, searchFor) => {
    if(searchFor === ""){
        return data
    }else{
    return data.filter(note => note.title.toLowerCase().includes(searchFor.toLowerCase()))
}}

export { filterBySelectedTags, filterDataByPriority, filterDataByTime, filterBySearch}