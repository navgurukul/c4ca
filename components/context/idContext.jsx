import React from "react";
import { createContext } from "react";
import { useState } from "react";
let partnerIdContext = createContext()

function partnerIdState({children}) {
  const [partnerIdState, setpartnerIdState] = useState("");

  console.log("partnerIdState", partnerIdState);
  return (
    <partnerIdContext.Provider value={{partnerIdState, setpartnerIdState}}>
        {children}
    </partnerIdContext.Provider>
  );
}

export {partnerIdState, partnerIdContext};