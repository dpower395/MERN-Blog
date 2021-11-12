import {createContext, useReducer, useEffect} from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  // should start without user logged in
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching:false,
  error:false
};

// going to use context in pretty much every page
export const Context = createContext(INITIAL_STATE);

// exporting this to index.js so it can use these values
export const ContextProvider = ({children}) => {
  // the reducer is gonna update the initial state
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    // sets a key and value in browsers local storage
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user:state.user,
        isFetching:state.isFetching,
        error:state.error,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};
