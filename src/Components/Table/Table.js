import React, { useState, useContext, useEffect } from "react";
import { tableContext } from "../../socket";
import classes from "./Table.module.css";

const Table = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const { tableData, mergeCells, unmergeCell } = useContext(tableContext);
  const [mergeButtonDisbaled, setMergeButtonDisbaled] = useState(true);
  const [unMergeButtonDisbaled, setUnMergeButtonDisbaled] = useState(true);

  useEffect(() => {
    // checks if there are any selected cells
    if (selectedCells.length > 1) {
      const tableRowOfFirstSelected = selectedCells[0].rowIndex;
      // checks if they are in the same row
      if (selectedCells.slice(1).every((cell) => cell.rowIndex === tableRowOfFirstSelected)) {
        // checks if they are beside each other
        if (Math.abs(selectedCells.at(-1).columnIndex - selectedCells.at(-2).columnIndex) === 1) {
          setMergeButtonDisbaled(false);
        } else {
          setMergeButtonDisbaled(true);
        }
      } else {
        setMergeButtonDisbaled(true);
      }
    } else {
      setMergeButtonDisbaled(true);
    }
  }, [selectedCells]);

  useEffect(() => {
    if (selectedCells.length === 1) {
      if (selectedCells[0].colSpan > 1) setUnMergeButtonDisbaled(false);
      else setUnMergeButtonDisbaled(true);
    } else {
      setUnMergeButtonDisbaled(true);
    }
  }, [selectedCells]);

  function selectCell(cell) {
    setSelectedCells((prev) => {
      const cellIndex = prev.findIndex((_cell) => _cell.id === cell.id);
      const cellExistinSelectedList = cellIndex !== -1;
      if (cellExistinSelectedList) {
        return [...prev.filter((_cell) => _cell.id !== cell.id)];
      } else {
        return [...prev, cell];
      }
    });
  }

  return (
    <>
      <table id="table" border="1" style={{ width: "100%" }}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} id="row">
              {row.map((cell, columnIndex) => (
                <td
                  id={cell.id}
                  key={columnIndex}
                  colSpan={cell.colSpan || 1}
                  onClick={() => selectCell({ ...cell, rowIndex, columnIndex })}
                  className={`${
                    selectedCells.some((_cell) => _cell.id === cell.id) ? "selected" : ""
                  }`}
                >
                  {columnIndex}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        disabled={mergeButtonDisbaled}
        className={classes.button}
        onClick={() => {
          mergeCells(selectedCells);
          setSelectedCells([]);
        }}
      >
        merge
      </button>
      <button
        disabled={unMergeButtonDisbaled}
        className={classes.button}
        onClick={() => {
          unmergeCell(selectedCells[0]);
          setSelectedCells([]);
        }}
      >
        unmerge
      </button>
    </>
  );
};
export default Table;
