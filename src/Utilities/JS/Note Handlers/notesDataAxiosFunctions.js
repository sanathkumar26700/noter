import axios from "axios";

const getNotesHandler = async (token) => {
  return await axios.get("/api/notes", {
      headers: { authorization: token },
    });
};

const createNoteHandler = async (note, token, dataDispatch) => {
  return await axios.post(
      "/api/notes",
      { note: note },
      { headers: { authorization: token } }
    );
};

const updateNoteHandler = async (note, token, dataDispatch) => {
  return await axios.post(
      `/api/notes/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
}

const notePinHandler = async (note, token, dataDispatch) => {
  return await axios.post(
      `api/notes/pin/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
}


export { getNotesHandler, createNoteHandler, updateNoteHandler, notePinHandler};
