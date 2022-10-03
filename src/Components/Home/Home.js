import React, { useState, useContext } from "react";
import classes from "./Home.module.css";
import { tableContext } from "../../socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { row, setRows, cols, setCols, generate } = useContext(tableContext);

  const handleRow = (e) => {
    setRows(e.target.value);
  };
  const handleCols = (e) => {
    setCols(e.target.value);
  };
  return (
    <>
      <div className={classes.form_signup}>
        <div className={classes.input_form}>
          <label htmlFor="rows">Enter number of rows</label>
          <input type="text" value={row} onChange={handleRow} />
        </div>
        <div className={classes.input_form}>
          <label htmlFor="rows">Enter number of columns</label>
          <input type="text" value={cols} onChange={handleCols} />
        </div>

        <button
          type="submit"
          onClick={() => {
            generate();
            navigate("/table");
          }}
        >
          generate
        </button>
      </div>
    </>
  );
};
export default Home;
