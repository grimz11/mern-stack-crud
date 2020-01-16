import {
  FETCH_ALL_PERSON,
  DELETE_SINGLE_PERSON,
  UPDATE_SINGLE_PERSON,
  FETCH_SINGLE_PERSON,
  ADD_SINGLE_PERSON
} from "./types";
import axios from "axios";

export const getAllPerson = () => async dispatch => {
  const res = await axios.get(`http://localhost:5000/api/users`);
  dispatch({
    type: FETCH_ALL_PERSON,
    payload: res.data
  });
};

export const deleteSinglePerson = ({ id }) => async dispatch => {
  const res = await axios.delete(`http://localhost:5000/api/users/${id}`);
  dispatch({
    type: DELETE_SINGLE_PERSON,
    id: res.data.id
  });
};

export const updateSinglePerson = payload => async dispatch => {
  const { id, firstname, lastname, birthday, address, hobbies } = payload;
  await axios({
    method: "PUT",
    url: `http://localhost:5000/api/users/${id}`,
    headers: { "Content-Type": "application/json" },
    referrerPolicy: "no-referrer",
    data: {
      firstName: firstname,
      lastName: lastname,
      birthDay: birthday,
      hobbies: hobbies.split(","),
      address
    }
  }).catch(err => console.log(err));

  dispatch({
    type: UPDATE_SINGLE_PERSON
  });
};

export const getSinglePerson = ({ id }) => async dispatch => {
  const res = await axios.get(`http://localhost:5000/api/users/${id}`);
  dispatch({
    type: FETCH_SINGLE_PERSON,
    payload: res.data
  });
};

export const addSinglePerson = payload => async dispatch => {
  console.log(payload);
  const { firstname, lastname, birthday, address, hobbies } = payload;
  await axios({
    method: "POST",
    url: "http://localhost:5000/api/users",
    data: {
      firstName: firstname,
      lastName: lastname,
      birthDay: birthday,
      hobbies: hobbies.split(","),
      address
    }
  });
  dispatch({
    type: ADD_SINGLE_PERSON
  });
};
