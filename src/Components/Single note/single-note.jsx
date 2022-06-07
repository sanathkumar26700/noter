import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { notePinHandler}  from '../../Utilities/JS/Data Handlers/notesDataHandler';
import { useAuth } from '../../Context/authContext.js'
import { useUserData } from '../../Context/userDataContext'

import './single-note.css'

function SingleNote({note, setEditNoteData, setShowModal}) {

  const {title, content, color, isPinned, priority, tag, date, _id} = note
  
  const {auth : {token}} = useAuth();

  const { userDataDispatch  } = useUserData()

  const editNoteDataHandler = (e) => {
    e.preventDefault();
    setEditNoteData(note);
    setShowModal(true);
  };

  const callNotePinHandler = (e) => {
    e.preventDefault();
    notePinHandler(note, token, userDataDispatch);
  };

  return (
    <>
      <article className={`noteCard__container ${color}`} key={_id}>
        <div className='noteCard__Primary'>
          <h1 className='noteCard--title'>{title}</h1>
          <div className='noteCard__Primary--action'>
            <button
              className='btn--pin'
              onClick={callNotePinHandler}
            >
              <i className={` ${isPinned ? 'fas fa-times' : 'fas fa-thumbtack'}`}></i>
            </button>
          </div>
        </div>
        <div className='noteCard--content'>
          {HtmlParser(content)}
        </div>
        <div className='noteCard__description--container'>
            <span className={`noteCard--priority ${priority}`}>
              {priority}
            </span>
            {tag !== '' && (
            <div className='noteCard--tag'>
              {tag}
            </div>
            )}
          </div>
        <div className='noteCard__secondary--container'>
            <span className='noteCard--date'>{date}</span>
            <div className='noteCard__secondary--action'>
              <button onClick={editNoteDataHandler}>
                <i className="fas fa-edit"></i>
              </button>
              <button>
                <i className="fas fa-archive"></i>
              </button>
              <button>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
        </div>
        </article>
    </>
  )
}

export default SingleNote