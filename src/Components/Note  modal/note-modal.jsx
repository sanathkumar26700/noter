import { useState, useRef, useEffect } from 'react';
import { RichTextEditor } from '../Rich Text Editor/rich-text-editor';
import { useAuth } from '../../Context/authContext.js'
import { useDataContext } from '../../Context/dataContext.js'
import { useUserData } from '../../Context/userDataContext'
import { createNoteHandler, editNoteDataHandler } from '../../Utilities/JS/notesDataHandler';
import dayjs from "dayjs";

import './note-modal.css';

const NoteModal = ({ setShowModal, editNoteData, setEditNoteData }) => {

  const { userDataDispatch } = useUserData();
  const {auth : {token}} = useAuth();
  const {data : { tags }} = useDataContext()

  const titleRef = useRef()
  const errRef = useRef()

  const [errMsg, setErrMsg] = useState('')
  const [note, setNote] = useState(editNoteData ?? {  title: '',
                                                      content: '',
                                                      color: 'default',
                                                      isPinned: false,
                                                      priority: 'Low',
                                                      tag: '',
                                                      date: dayjs().format("HH:mm  DD/MM/YYYY")
                                                  });

  useEffect(()=>{
    titleRef.current.focus();
  },[])

  const inputHandler = (event) => {
    const { id, value } = event.target;
    setNote((prev) => ({ ...prev, [id]: value }));
  };

  const inputValidationHandler = () => {
    if (note.title.trim() === '') {
      setErrMsg('Must Add Note Title');
    }else {
      return true;
    }
  };

  const callNoteHandler = () => {
    if (inputValidationHandler()) {
      editNoteData ?
          editNoteDataHandler(note, token, userDataDispatch)
        : 
          createNoteHandler(note, token, userDataDispatch);
      setEditNoteData(null);
      setShowModal(false);
    }
  };

  return (
    <div className='modal__container'>
      <div className='modal'>
        <div className='modal__title--container'>
        <span className='modal__title'>
        {editNoteData ? 'Edit Note' : 'Create Note'}
        </span>
        <button
            className='modal__btn card__btn-fav'
            onClick={() =>{  
              setEditNoteData(null);
              setShowModal(false)}}
        >
          <i className='fas fa-times'></i>
        </button>
        </div>
        <div className='Modal__description'>
        <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
          <input
            type='text'
            id='title'
            ref={titleRef}
            placeholder='Title'
            className={`title ${note.color}`}
            value={note.title}
            onChange={inputHandler}
          />
          <RichTextEditor
            note={note}
            setNote={setNote}
            className={note.color}
          />
        </div>
        <div className='note-modal__action--container'>
          <div className='options'>
            <label htmlFor='tag'>Tags: </label>
            <select
              name='tag'
              id='tag'
              value={note.tag}
              onChange={inputHandler}
            >
              <option>None</option>
              {tags.map((tag) => (
                <option key={tag._id} value={tag.tagTitle}>
                {tag.tagTitle}
                </option>
              ))}
            </select>
          </div>
          <div className='options'>
            <label htmlFor='tag'>Priority: </label>
            <select
              name='priority'
              id='priority'
              value={note.priority}
              onChange={inputHandler}
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>
          <div className='options'>
            <label htmlFor='color'>Color: </label>
            <select
              name='color'
              id='color'
              value={note.color}
              onChange={inputHandler}
            >
              <option>Default</option>
              <option value='green'>Green</option>
              <option value='blue'>Blue</option>
              <option value='pink'>Pink</option>
              <option value='grey'>Grey</option>
            </select>
          </div>
        </div>
        <div className='card__btn--container'>
          <button 
              className='btn btn__primary btn__primary--animated' 
              onClick={callNoteHandler}
          >
                Save Note
          </button>
        </div> 
      </div>
    </div>
  );
};

export { NoteModal };