import {BirthdayActions} from '../actions/birthday-actions';

let nextId = 0;

export function BirthdaysReducer(state = [], action) {
  switch (action.type) {
    case BirthdayActions.LOAD_BIRTHDAYS_SUCCESS:
      return action.payload;
    case BirthdayActions.ADD_UPDATE_BIRTHDAY_SUCCESS:
      var exists = state.find(birthday => birthday._id === action.payload._id);

      if (exists) {
        // UPDATE
        return state.map(birthday => {
          return birthday._id === action.payload._id ? Object.assign({}, birthday, action.payload) : birthday;
        });
      }
      else {
        // ADD
        return [...state, Object.assign({}, action.payload)];
      }
    case BirthdayActions.DELETE_BIRTHDAY_SUCCESS:
      return state.filter(birthday => birthday._id !== action.payload);
    default:
      return state;
  }
}
