import {useDataContext} from '../../Context/dataContext'
import './filter.css';

function Filter({display}) {

    const {data:{createdTime, priority, tags, selectedTags}, dataDispatch} = useDataContext()

    const tagHandler = (tag) => {
        if(selectedTags.includes(tag)){
        return selectedTags.filter(tagName => tagName !== tag)
           
        }else{
            selectedTags.push(tag)
            return selectedTags
        }
    }

    return (
        <div>
            <aside 
                className="filter__section side-shadow"
                style ={{display}}
            >
                <div className="filter--box">
                    <div className="filter--header">
                        <h1>filter</h1>
                        <span className="filter--reset badge--text badge--red"
                        onClick = {() => dataDispatch({type: "CLEAR"})}
                        >reset
                        </span>
                    </div>
                </div>
                <div className="filter--box">
                <div className="filter__container">
                    <h1>Sort by Tags</h1>
                    {tags.map((tag) =>{
                    return (<div>
                        <input 
                            className="tag--input"  
                            type="checkbox" 
                            id={tag._id}
                            value={tag.tagTitle}
                            checked = {selectedTags.includes(tag.tagTitle)}
                            onChange = {(e) =>  dataDispatch({type : "SORT_BY_TAGS" , payload : (tagHandler(e.target.value))})}
                            />
                            <label className="tag--label" key = {tag._id} htmlFor={tag._id}>{tag.tagTitle}</label>
                    </div>)}
                    )}
                </div>
                </div>
                <div className="filter--box">
                    <div className="filter__container">
                        <h1>Sort by Priority</h1>                        
                            <div>
                                <input 
                                    className="tag--input" 
                                    type="radio" 
                                    name="priority"
                                    id= "HIGH_TO_LOW"
                                    onChange={()=>dataDispatch({type :"HIGH_TO_LOW"})}
                                    checked={priority === "HIGH_TO_LOW"}/>
                                    <label htmlFor="HIGH_TO_LOW">High to Low</label>
                            </div>
                            <div>
                                <input 
                                    className="tag--input" 
                                    type="radio" 
                                    name="priority"
                                    id= "LOW_TO_HIGH"
                                    onChange={()=>dataDispatch({type :"LOW_TO_HIGH"})}
                                    checked={priority === "LOW_TO_HIGH"}/>
                                <label htmlFor="LOW_TO_HIGH">Low to High</label>
                            </div>                       
                    </div>
                </div>
                <div className="filter--box">
                    <div className="filter__container">
                        <h1>Sort by Time</h1>                        
                            <div>
                                <input 
                                    className="tag--input" 
                                    type="radio" 
                                    name="createdTime"
                                    id= "NEW_TO_OLD"
                                    onChange={()=>dataDispatch({type :"NEW_TO_OLD"})}
                                    checked={createdTime === "NEW_TO_OLD"}/>
                                    <label htmlFor="NEW_TO_OLD">New to Old</label>
                            </div>
                            <div>
                                <input 
                                    className="tag--input" 
                                    type="radio" 
                                    name="createdTime"
                                    id= "OLD_TO_NEW"
                                    onChange={()=>dataDispatch({type :"OLD_TO_NEW"})}
                                    checked={createdTime === "OLD_TO_NEW"}/>
                                <label htmlFor="OLD_TO_NEW">Old to New</label>
                            </div>                       
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default Filter;