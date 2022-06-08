import { useUserData } from '../../Context/userDataContext'
import SingleNote from "../../Components/Single note/single-note"

import '../Archives/archives.css'

function Archives() {

  const { userData : {trashData}  } = useUserData()
  const trashLength = trashData.length

  return(
    <section className="archive-list__container">
      {trashLength ?
      <>
        <h1 className='archives__section--heading'>Trash ({trashLength})</h1>
        <section className="archive-list__section">
          {trashData.map((note) =><SingleNote note = {note} key={note._id}/>)}
        </section>
      </>
          : 
      <h1 className = "note-list__empty--text">You have no Trash 😉</h1>
      }
    </section>
  )
}

export default Archives