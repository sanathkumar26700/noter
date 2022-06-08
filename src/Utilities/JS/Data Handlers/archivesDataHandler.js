import axios from "axios";
import { toast } from 'react-toastify';

const getArchivesHandler = async (token, userDataDispatch) => {
  try {
    const response = await axios.get('/api/archives', {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      userDataDispatch({ type: "SET_ARCHIVES", payload: response?.data?.archives });
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const addNoteToArchivesHandler = async (note, token, userDataDispatch, setFetchingArchives) => {
  setFetchingArchives(true)
  try {
    const response = await axios.post(
      `/api/notes/archives/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
    if (response.status === 201) {
      userDataDispatch({ type: "SET_ARCHIVES", payload: response?.data?.archives });
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
      toast.success("Note Archived");
      setFetchingArchives(false)
    } else throw new Error();
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const restoreNoteFromArchivesDataHandler = async (note, token, userDataDispatch, setFetchingArchives) => {
  setFetchingArchives(true)
  try {
    const response = await axios.post(
      `/api/archives/restore/${note._id}`,
      {  },
      { headers: { authorization: token } }
    );
    if (response.status === 200) {
      userDataDispatch({ type: "SET_ARCHIVES", payload: response?.data?.archives });
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
      setFetchingArchives(false)
      toast.success("Note Restored");
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { getArchivesHandler, addNoteToArchivesHandler, restoreNoteFromArchivesDataHandler};