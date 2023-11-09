import React, { useState, useEffect } from 'react';
import { fetchData, createData, updateData, deleteData /*, conaxios*/ } from './Api';
import axios from 'axios';

const Anteproyectosrecibidos = () => {
 

   //pruebas de importacion
   const [data, setData] = useState(null);
  const [newItem, setNewItem] = useState({ nombre: '', ncontrol: '',nombre_anteproyecto: '', periodo: '', empresa: '', asesorE: ''});
  const [editingId, setEditingId] = useState(null); // ID del elemento en edición

  const [documentId, setDocumentId] = useState(null);

  const [documents, setDocuments] = useState([]);
  
  //pruebas de importacion
  const nombretabla = 'api/residentesuploads';
  const nombredocumentos = 'api/upload/files/';

  //CARGAMOS LOS DATOS PARA PODER VISUALISARLOS
  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const data = await fetchData(nombretabla);
        setData(data);
        console.log('Datos cargados correctamente');
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
    fetchDataAsync();
  }, []);

  ////CARGAR DOCUMENTOS
  useEffect(() => {
    // Realiza una solicitud GET a la API de Strapi para obtener la lista de documentos
    async function fetchDocuments() {
      try {
        const response = await axios.get(`http://localhost:1337/${nombredocumentos}`); // Asegúrate de usar la URL correcta
        setDocuments(response.data);
        console.log('Documentos cargados correctamente');
      } catch (error) {
        console.error('Error al obtener la lista de documentos:', error);
      }
    }

    fetchDocuments();
  }, []);

    return (
      <div className="contenido__Alumnos_residentes">
        <h2>Relación de anteproyectos</h2>
        <div className="tablita">
          <table border="1">
            <thead>
              <tr>
                <th>N° DE CONTROL</th>
                <th>NOMBRE</th>
                <th>CARRERA</th>
                <th>EMPRESA</th>
                <th>PROYECTO</th>
                <th>PERIODO</th>
                <th>DOCUMENTO</th>
                <th>OBSERVACIONES</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            
            <tbody>
            <tr>
                        <td><center></center></td>   
                        <td><center></center></td>
                        <td><center></center></td>
                        <td><center></center></td>
                        <td><center></center></td>   
                        <td><center></center></td>   
                        <td><center></center></td>   
                        <td><textarea name="textarea" placeholder="Ingrese las observaciones" /></td>   
                        <th> 
                          <button>ACEPTADO</button> 
                          <button>CORRECIONES</button> 
                        </th>                                        
            
                 
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    );
  };
  export default Anteproyectosrecibidos;
  