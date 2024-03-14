import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
let loggedOutContext = createContext()

function LoggedOutState({children}) {
  const [shouldLogOut, setShouldLogOut] = useState("false");

  return (
    <loggedOutContext.Provider value={{shouldLogOut, setShouldLogOut}}>
        {children}
    </loggedOutContext.Provider>
  );
}

export {LoggedOutState, loggedOutContext};