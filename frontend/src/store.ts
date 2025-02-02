import { createStore, combineReducers, Reducer } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Action Types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT"; // Add this action type
const SET_USERNAME = "SET_USERNAME";
const SET_PASSWORD = "SET_PASSWORD";
const SET_MESSAGE = "SET_MESSAGE";
const SET_CONTENT = "SET_CONTENT";

// Initial State Interface
interface LoginState {
  isLoggedIn: boolean;
  username: string;
  password: string;
  message: string;
  content: string;
}

// Initial State
const initialState: LoginState = {
  isLoggedIn: false,
  username: "",
  password: "",
  message: "",
  content: "",
};

// Action Types
interface LoginAction {
  type: typeof LOGIN;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface SetUsernameAction {
  type: typeof SET_USERNAME;
  payload: string;
}

interface SetPasswordAction {
  type: typeof SET_PASSWORD;
  payload: string;
}

interface SetMessageAction {
  type: typeof SET_MESSAGE;
  payload: string;
}

interface SetContentAction {
  type: typeof SET_CONTENT;
  payload: string;
}

// Union of all actions
type AppActions =
  | LoginAction
  | LogoutAction // Add LogoutAction
  | SetUsernameAction
  | SetPasswordAction
  | SetMessageAction
  | SetContentAction;

// Reducer
const loginReducer: Reducer<LoginState, AppActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT: // Add this case
      return { ...initialState }; // Reset the state to initial values
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    case SET_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  login: loginReducer,
});

// Store Type
export type RootState = ReturnType<typeof rootReducer>;

// Store
const store = createStore(rootReducer);

// Typed Hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

// Action Creators
export const login = (): LoginAction => ({ type: LOGIN });

export const logout = (): LogoutAction => ({ type: LOGOUT }); // Add this action creator

export const setUsername = (username: string): SetUsernameAction => ({
  type: SET_USERNAME,
  payload: username,
});

export const setPassword = (password: string): SetPasswordAction => ({
  type: SET_PASSWORD,
  payload: password,
});

export const setMessage = (message: string): SetMessageAction => ({
  type: SET_MESSAGE,
  payload: message,
});

export const setContent = (content: string): SetContentAction => ({
  type: SET_CONTENT,
  payload: content,
});
