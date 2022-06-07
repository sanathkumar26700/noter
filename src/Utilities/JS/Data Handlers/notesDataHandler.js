import axios from "axios";
import { toast } from 'react-toastify';

const getNotesHandler = async (token, userDataDispatch) => {
  try {
    const response = await axios.get("/api/notes", {
      headers: { authorization: token },
    });

    if (response.status === 200) {
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const createNoteHandler = async (note, token, userDataDispatch) => {
  try {
    const response = await axios.post(
      "/api/notes",
      { note },
      { headers: { authorization: token } }
    );

    if (response.status === 201) {
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
      toast.success("Note Successfully Added");
    } else throw new Error();
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const editNoteDataHandler = async (note, token, userDataDispatch) => {
  try {
    const response = await axios.post(
      `/api/notes/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
    if (response.status === 201) {
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
      toast.success("Note Successfully Updated");
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const notePinHandler = async (note, token, userDataDispatch) => {
  try {
    const response = await axios.post(
      `api/notes/pin/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );

    if (response.status === 200) {
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  } 
};

export { getNotesHandler, createNoteHandler, editNoteDataHandler, notePinHandler};
