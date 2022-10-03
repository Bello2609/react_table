import React, { createContext, useState } from "react";
import uuid from "react-uuid";
export const tableContext = createContext();

const TableProvider = ({ children }) => {
  const [row, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [tableData, setTableData] = useState([]);

  function generate() {
    return setTableData(
      Array.from(
        Array.from({ length: parseInt(row) }, () =>
          Array.from({ length: parseInt(cols) }, () => ({ id: uuid() }))
        )
      )
    );
  }

  return (
    <tableContext.Provider value={{ row, setRows, cols, setCols, generate, tableData }}>
      {children}
    </tableContext.Provider>
  );
};
export default TableProvider;
