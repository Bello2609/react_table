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
          Array.from({ length: parseInt(cols) }, () => ({ id: uuid(), colSpan: 1 }))
        )
      )
    );
  }

  function mergeCells(cells) {
    const [firstCell] = cells;
    const firstCellColumnIndex = firstCell.columnIndex;
    const rowIndexForMerge = firstCell.rowIndex;
    const amountOfCellsToMerge = cells.length;

    const compoundCellData = {
      id: firstCell.id,
      colSpan: amountOfCellsToMerge,
      restOfMergedCells: cells.slice(1),
    };

    tableData[rowIndexForMerge][firstCellColumnIndex] = compoundCellData;
    tableData[rowIndexForMerge].splice(firstCellColumnIndex + 1, amountOfCellsToMerge - 1);

    setTableData([...tableData]);
  }

  function unmergeCell(cell) {
    const { restOfMergedCells, colSpan, rowIndex, columnIndex } = cell;

    const compoundCellData = {
      id: cell.id,
      colSpan: colSpan - restOfMergedCells.length,
    };

    tableData[rowIndex][columnIndex] = compoundCellData;
    tableData[rowIndex].splice(columnIndex + 1, 0, ...restOfMergedCells);

    setTableData([...tableData]);
  }

  return (
    <tableContext.Provider
      value={{ row, setRows, cols, setCols, generate, tableData, mergeCells, unmergeCell }}
    >
      {children}
    </tableContext.Provider>
  );
};
export default TableProvider;
