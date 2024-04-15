// src/App.tsx

import {  Routes, Route, } from 'react-router-dom';


import TablePage from './pages/TablePage'
import  WeatherPage from './pages/WeatherPage';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

import ErrorPage from './pages/ErrorPage';



function App() {
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/"  element={<HomePage/>} />
    <Route path="/about"  element={<AboutPage/>} />
      
        <Route path="/table"  element={<TablePage/>} />
        <Route path="/weather/:city" element={<WeatherPage/>} />
      
        <Route path="*"  element={<ErrorPage/>} />

     
    </Routes>
    </>
  );
}

export default App;
