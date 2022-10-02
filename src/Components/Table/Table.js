import React, { useState, useContext } from 'react';
import { tableContext } from '../../socket';
import uuid from "react-uuid";
// import classes from './Table.module.css';


const Table  = ()=>{
    const [ isClick, setIsClick ] = useState("false");
const { row, cols } = useContext(tableContext);
// const [ _, _, cols ] = useContext(tableContext);

console.log(cols);

const rowClick = (e)=>{
    const myRow = document.getElementById("table");
    for (var i = 0, row; row = myRow.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++) {
            console.log(e.target.id);
            // if(e.target.id === index){
            //     setIsClick(!isClick);
            // }
           
            
          //iterate through columns
          //columns would be accessed using the "col" variable assigned in the for loop
        }  
     }
}
const id = uuid();
const generateId = ()=>{
    return uuid();
}
    return(
        <>
            <table id="table" border="1" style={{width: "100%"}}>
                <tbody>
                {
                    row.map(rr=>(
                        
                        <tr key={rr} id="row">
                            {
                                cols.map((cc)=>(
                                    <td id={generateId()} key={cc} onClick={rowClick}>{cc}</td>
                                ))
                            }
                        </tr>
                       
                    ))
                }
                </tbody>
                
            </table>
        </>
    )
}
export default Table;

