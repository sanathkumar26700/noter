import axios from "axios";
import { toast } from 'react-toastify';

const getTrashHandler = async (token, userDataDispatch) => {
  try {
    const response = await axios.get('/api/trash', {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      userDataDispatch({ type: "SET_TRASH", payload: response?.data?.trash });
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const addNoteToTrashHandler = async (note, token, userDataDispatch, setFetchingTrash) => {
  setFetchingTrash(true)
  try {
    const response = await axios.post(
      `/api/notes/trash/${note._id}`,
      { note },
      { headers: { authorization: token } }
    );
    if (response.status === 201) {
      userDataDispatch({ type: "SET_TRASH", payload: response?.data?.trash });
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
      toast.success("Note sent to Trash");
      setFetchingTrash(false)
    } else throw new Error();
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const restoreNoteFromTrashDataHandler = async (note, token, userDataDispatch, setFetchingTrash) => {
  setFetchingTrash(true)
  try {
    const response = await axios.post(
      `/api/trash/restore/${note._id}`,
      {  },
      { headers: { authorization: token } }
    );
    if (response.status === 200) {
      userDataDispatch({ type: "SET_TRASH", payload: response?.data?.trash });
      userDataDispatch({ type: "SET_NOTES", payload: response?.data?.notes });
      setFetchingTrash(false)
      toast.success("Note Restored");
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

const deleteNoteDataHandler = async (note, token, userDataDispatch, setFetchingTrash) => {
    setFetchingTrash(true)
    try {
      const response = await axios.delete(
        `/api/trash/delete/${note._id}`,
        { headers: { authorization: token } }
      );
      if (response.status === 200) {
        userDataDispatch({ type: "SET_TRASH", payload: response?.data?.trash });
        setFetchingTrash(false)
        toast.success("Note Deleted Permanently");
      }
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };

export { getTrashHandler, addNoteToTrashHandler, restoreNoteFromTrashDataHandler, deleteNoteDataHandler};