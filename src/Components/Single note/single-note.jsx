import { useState } from 'react'
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { useLocation } from "react-router-dom";
import { notePinHandler}  from '../../Utilities/JS/Data Handlers/notesDataHandler';
import {addNoteToArchivesHandler, restoreNoteFromArchivesDataHandler} from '../../Utilities/JS/Data Handlers/archivesDataHandler'
import {addNoteToTrashHandler, restoreNoteFromTrashDataHandler, deleteNoteDataHandler} from '../../Utilities/JS/Data Handlers/trashDataHandler'
import { useAuth } from '../../Context/authContext.js'
import { useUserData } from '../../Context/userDataContext'

import './single-note.css'

function SingleNote({note, setEditNoteData, setShowModal}) {

  const {title, content, color, isPinned, priority, tag, date, _id} = note
  
  const {auth : {token}} = useAuth();
  const location = useLocation()
  const { userDataDispatch  } = useUserData()

  const [fetchingArchives, setFetchingArchives] = useState(false)
  const [fetchingTrash, setFetchingTrash] = useState(false)

  const editNoteDataHandler = (e) => {
    e.preventDefault();
    setEditNoteData(note);
    setShowModal(true);
  };

  return (
    <>
      <article className={`noteCard__container ${color}`} key={_id}>
        <div className='noteCard__Primary'>
          <h1 className='noteCard--title'>{title}</h1>
          <div className='noteCard__Primary--action'>
          {location.pathname === '/notes' &&
            <button
              className='btn--pin'
              onClick={() => notePinHandler(note, token, userDataDispatch)}
            >
              <i className={` ${isPinned ? 'fas fa-times' : 'fas fa-thumbtack'}`}></i>
            </button>
          }
          </div>
        </div>
        <div className='noteCard--content'>
          {HtmlParser(content)}
        </div>
          
        <div className='noteCard__secondary--container'>
        <div className='noteCard__description--container'>
            <span className={`noteCard--priority ${priority}`}>
              {priority}
            </span>
            {tag !== '' && (
            <div className='noteCard--tag'>
              {tag}
            </div>
            )}
            <span className='noteCard--date'>{date}</span>
          </div>
            <div className='noteCard__secondary--action'>
              {location.pathname === '/notes' && 
                <button className='btn--action btn--edit'
                  onClick={editNoteDataHandler}>
                  <i className="fas fa-edit"></i>
                </button>
              }
              {location.pathname === '/notes' &&
              <button className='btn--action btn--archive'
                    onClick={()=> addNoteToArchivesHandler(note, token, userDataDispatch, setFetchingArchives)}
                    disabled={fetchingArchives}>
                  <i className="fas fa-archive"></i>
                </button>
              }
              {location.pathname === '/archives' &&
              <button className='btn--action btn--restore'
                    onClick={()=> restoreNoteFromArchivesDataHandler(note, token, userDataDispatch, setFetchingArchives)}
                    disabled={fetchingArchives}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              }
              {location.pathname === '/notes' && 
              <button 
                className='btn--action btn--trash'
                onClick={()=>addNoteToTrashHandler(note, token, userDataDispatch, setFetchingTrash)}
                disabled={fetchingTrash}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              }
              {location.pathname === '/trash' && 
              <button 
                className='btn--action btn--delete'
                onClick={()=>deleteNoteDataHandler(note, token, userDataDispatch, setFetchingTrash)}
                disabled={fetchingTrash}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              }
              {location.pathname === '/trash' && 
              <button 
                className='btn--action btn--restore'
                onClick={()=> restoreNoteFromTrashDataHandler(note, token, userDataDispatch, setFetchingTrash)}
                disabled={fetchingTrash}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              }
            </div>
        </div>
        </article>
    </>
  )
}

export default SingleNote