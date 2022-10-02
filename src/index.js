import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import Table from "./Components/Table/Table";
import TableProvider  from "./socket";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TableProvider>
    <BrowserRouter>
    
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/table" element={<Table />} />
      </Routes>
   
    </BrowserRouter>
    </TableProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
