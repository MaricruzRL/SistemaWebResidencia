import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTh, FaRegListAlt, FaRegFileAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

const Barra = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const navigateTo = (ruta) => {
        navigate(ruta); // Función de manejo de rutas
    };
    const isActive = (ruta) => {
        switch (ruta) {
            case '/inicio':
            case '/':
                return location.pathname === ruta;
            case '/anteproyectosubir':
                return location.pathname === ruta;
            default:
                return false;
        }
    };
    return (
        <div className={`barra__lateral ${isOpen ? 'barra__lateral_abierta' : ''}`} title='Menu'>
            <header onClick={toggleSidebar} className='barra__lateral_titulo'>
                <h1>Sistemas e <br />informática </h1>
                <GiHamburgerMenu className="iconomenu" />
            </header>
            <div title='Inicio' className={`boton ${isActive('/inicio') ? 'activo' : ''}`} onClick={() => navigateTo('/inicio')} >
                <FaTh className="icono"  />
                <h1>Inicio </h1>
            </div>
            <div title='Anteproyecto' className={`boton ${isActive('/anteproyectosubir') ? 'activo' : ''}`} onClick={() => navigateTo('/anteproyectosubir')}>
                <FaRegListAlt className="icono" />
                <h1>Subir Anteproyecto</h1>
            </div>
           
           
            <main>
                {children}
            </main>
        </div>
    );
};

export default Barra;