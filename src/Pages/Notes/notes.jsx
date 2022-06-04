import { useState } from 'react'
import { useDataContext } from '../../Context/dataContext'
import { useUserData } from '../../Context/userDataContext'

import { NoteModal } from '../../Components/Note  modal/note-modal';
import SingleNote from "../../Components/Single note/single-note"
import Filter from '../../Components/Filter/filter';
import { filterBySelectedTags, filterDataByPriority, filterDataByTime, filterBySearch} from '../../Utilities/JS/filterFunctions'

import './notes.css'

function Notes() {
  
  const [display, setDisplay] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [editNoteData, setEditNoteData] = useState(null);
  const {data : {createdTime, priority, isLoading, selectedTags, searchFor}} = useDataContext()
  const { userData : {notesData}  } = useUserData()

  const pinnedNotes = notesData.filter(notes => notes.isPinned)
  const unPinnedNotes = notesData.filter(notes => !notes.isPinned)

  const filteredByTags = filterBySelectedTags(unPinnedNotes, selectedTags)
  const filteredByPriority = filterDataByPriority(filteredByTags, priority)
  const filteredByTime = filterDataByTime(filteredByPriority, createdTime)
  const finalUnPinnedNotes = filterBySearch(filteredByTime, searchFor)

  return (
    <>
      <button 
          className = "btn btn--animated card__btn--add-note"
          onClick={() => setShowModal(true)}
      >
        <i className="fas fa-plus btn__icon-left">  Add Note</i>
      </button>
      <div className="filter__action--container ">
        {((display === 'none') || (display === '')) &&
                <button onClick={() => setDisplay('block')} className="btn btn__underlined"><i className="fas fa-filter" aria-hidden="true"></i></button>}
        {(display === 'block') && 
                <button onClick={() => setDisplay('none')} className="btn btn__underlined"><i className="fas fa-times" aria-hidden="true"></i></button>}
      </div>
      <section className="note-list__container">
        <Filter display={display}/>
        {isLoading ? 
          <img className="loader--image" src="https://cutewallpaper.org/21/loading-gif-transparent-background/HopeWell.gif" alt="loader"/> 
            :
          <>
            {notesData.length ?
              <section>
                {pinnedNotes.length ? <h1 className='notes-list__section--heading'>Pinned Notes</h1> : null}
                <section className="note-list__section">
                  {pinnedNotes.map((note) =>(<SingleNote 
                            note = {note} 
                            key={note._id} 
                            setShowModal={setShowModal} 
                            editNoteData = {editNoteData} 
                            setEditNoteData={setEditNoteData}/>)
                      )}
                </section>
                {finalUnPinnedNotes.length ? <h1 className='notes-list__section--heading'>My Notes</h1> : null}
                {!finalUnPinnedNotes.length ? 
                  <h1 className='notes-list__section--heading'>You don't any notes in this tag 😣</h1> 
                  :
                  <section className="note-list__section">
                    {finalUnPinnedNotes.map((note) =>(
                          <SingleNote 
                              note = {note} 
                              key={note._id} 
                              setShowModal={setShowModal} 
                              editNoteData = {editNoteData} 
                              setEditNoteData={setEditNoteData}/>)
                    )}
                  </section>
                }
              </section>
                : 
              <h1 className = "note-list__empty--text">You haven't added any notes 😣</h1>
            }
            </>
            }
      </section>
      {showModal && <NoteModal  setShowModal={setShowModal} editNoteData = {editNoteData} setEditNoteData={setEditNoteData}/>}
    </>
  )
}

export default Notes