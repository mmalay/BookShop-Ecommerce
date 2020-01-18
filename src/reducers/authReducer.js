import { SIGN_IN, SIGN_OUT } from '../actions/types';

const initialState = {
  isSignedIn: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
}
