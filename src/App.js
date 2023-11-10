import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*Componentes*/
import Barra from "./coordinadora/componentes/menu_lateral.jsx";
import Cabecera from "./componentes/cabecera.jsx";
import Pie from "./componentes/pie_de_pagina.jsx";
/* Paginas */
import Inicio from "./coordinadora/paginas/inicio.jsx";
import Anteproyectosrecibidos from "./coordinadora/paginas/Anteproyectosrecibidos.jsx";
/*Estilos*/
import './App.css';
import PaginaCordinador  from "./PaginaCor.jsx"
import PaginaEstudiante from './PaginaEstu.jsx';
import PaginaJefe from './PaginaJefeCarrera.jsx';
import PaginaAsesorInternos from './PaginaAsesorinterno.jsx';

const App = () => {
  return (
    <BrowserRouter>
    {/*<PaginaCordinador /> */} 
    {/* <PaginaEstudiante />*/} 
    {/*  <PaginaJefe />*/} 
    {/*<PaginaAsesorInternos />*/} 
    <PaginaEstudiante />
    </BrowserRouter>
  );
};

export default App;

