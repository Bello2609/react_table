import React, { createContext, useState } from "react";

export const tableContext = createContext();

const TableProvider = ({children})=>{
    const [ row, setRows ] = useState([]);
    const [ cols, setCols ] = useState([]);
    return(
        <tableContext.Provider value={{ row, setRows, cols, setCols }}>
            {children}
        </tableContext.Provider>
    );
}
export default TableProvider;
