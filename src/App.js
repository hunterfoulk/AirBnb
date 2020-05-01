import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import { StateProvider } from "./state";

function App() {
  const initialState = {
    auth: {
      isAuthenticated: false,
      token: "",
      user: {},
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          auth: action.auth,
        };
      case "logout":
        return {
          ...initialState,
        };

      default:
        return state;
    }
  };

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Navbar />

        <Homepage />
      </StateProvider>
    </>
  );
}

export default App;
