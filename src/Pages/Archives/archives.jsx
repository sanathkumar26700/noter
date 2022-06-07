import { useUserData } from '../../Context/userDataContext'
import SingleNote from "../../Components/Single note/single-note"

import './archives.css'

function Archives() {

  const { userData : {archivesData}  } = useUserData()

  return(
    <section className="archive-list__container">
    <h1 className='archives__section--heading'>Archives ({archivesData.length})</h1>
      {archivesData.length ?
        <section className="archive-list__section">
          {archivesData.map((note) =><SingleNote note = {note} key={note._id}/>)}
        </section>
          : 
        <h1 className = "note-list__empty--text">Your archives are empty😣</h1>
      }
    </section>
  )
}

export default Archives