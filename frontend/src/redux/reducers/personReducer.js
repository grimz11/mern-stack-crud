import {
  FETCH_ALL_PERSON,
  DELETE_SINGLE_PERSON,
  FETCH_SINGLE_PERSON
} from "../actions/types";

const initialState = {
  persons: [],
  person: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_PERSON: {
      return {
        persons: action.payload
      };
    }
    case DELETE_SINGLE_PERSON: {
      return {
        ...state,
        persons: state.persons.filter(person => person._id !== action.id)
      };
    }
    case FETCH_SINGLE_PERSON: {
      return {
        ...state,
        person: action.payload
      };
    }
    default:
      return state;
  }
}
