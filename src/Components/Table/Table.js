import React, { useState, useContext } from "react";
import { tableContext } from "../../socket";
import classes from "./Table.module.css";

const Table = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const { tableData } = useContext(tableContext);

  function selectCell(id, rowIndex, columnIndex) {
    setSelectedCells((prev) => {
      const cellIndex = prev.findIndex((cell) => cell.id === id);
      const cellExistinSelectedList = cellIndex !== -1;
      if (cellExistinSelectedList) {
        return [...prev.filter((cell) => cell.id !== id)];
      } else {
        return [
          ...prev,
          {
            id,
            rowIndex,
            columnIndex,
          },
        ];
      }
    });
  }

  return (
    <>
      <table id="table" border="1" style={{ width: "100%" }}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} id="row">
              {row.map(({ id }, columnIndex) => (
                <td
                  id={id}
                  key={columnIndex}
                  onClick={() => selectCell(id, rowIndex, columnIndex)}
                  className={`${selectedCells.some((cell) => cell.id === id) ? "selected" : ""}`}
                >
                  {columnIndex}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <button className={classes.button}>merge</button>
      </table>
    </>
  );
};
export default Table;
