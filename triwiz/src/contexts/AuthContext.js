import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const FINISH_NODE_ROW = 18;
  const FINISH_NODE_COL = 48;

  const [snodeRow, setSnodeRow] = useState(1);
  const [snodeCol, setSnodeCol] = useState(1);
  // const [randomMaze, setRandomMaze] = useState([]);
  const START_NODE_ROW = snodeRow;
  const START_NODE_COL = snodeCol;
  const value = {
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    setSnodeRow,
    setSnodeCol,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
