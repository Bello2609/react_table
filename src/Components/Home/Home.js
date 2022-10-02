import React, { useState, useContext } from "react";
import classes from "./Home.module.css";
import { tableContext } from "../../socket";
import { Link } from "react-router-dom";

const Home = ()=>{
  const { row, setRows, cols, setCols } = useContext(tableContext);

  const [ tRow, setTRow ] = useState([]);
  const [ tCols, setTCol ] = useState([]);


  const handleRow = (e)=>{
    const row = e.target.value;
    setTRow(row);
    let row_row = [];
    for(let index = 0; index < row; index++){
      row_row.push(index);
    }
    console.log(row_row);
    setRows(row_row);
  }
  const handleCols= (e)=>{
    const col = e.target.value;
    setTCol(col);
    let col_col = [];
    for(let index = 0; index < col; index++){
      col_col.push(index);
    }
    console.log(col_col);
    setCols(col_col);
  }
  return (
    <>
  
        <div className={classes.form_signup}>
                <div className={classes.input_form}>
                    <label htmlFor="rows">Enter number of rows</label>
                    <input type="text"  value={tRow || ""} onChange={handleRow} />
                </div>
                <div className={classes.input_form}>
                    <label htmlFor="rows">Enter number of columns</label>
                    <input type="text"  value={tCols || ""} onChange={handleCols} />
                </div>
                
                <Link to="/table"><button type="submit">generate</button></Link>
        </div>
    </>
    
  );
}
export default Home;