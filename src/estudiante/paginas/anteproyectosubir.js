import React, { useState, useEffect } from "react";

import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
  updateDataDoc,
} from "./formato";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
//PARA VISUALISAR ESPECIALIDEDEDES
const [especialidades, setEspecialidades] = useState(null);
//PARA VISUALISAR ESPECIALIDEDEDES
const [asesores, setAsesores] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [editingId, setEditingId] = useState(null); // ID del elemento en edición
  const [documentId, setDocumentId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentoCargado, setDocumentoCargado] = useState(false);

  const [newItem, setNewItem] = useState({
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
    carrera: "",
  });

  ///api/residentesuploads
  //pruebas de importacion
  const nombretabla = "api/residentesuploads";
  const nombredocumentos = "api/upload/files/";
  //#####################################
  const nombreespecialidades = 'api/especialidads'
  const nombreasesores = 'api/asesores-is'
  //pruebas de importacion
  const contenidodocumento = "api/upload";
  //
  const direccionapi = "http://localhost:1337/";
  ///

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //#######################################

  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const data = await fetchData(nombretabla);
        setData(data);
        console.log("Cargo data !", data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchDataAsync();
  }, []);

   //####################################### ESPECIALIDADES

   useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const especialidades = await fetchData(nombreespecialidades);
        setEspecialidades(especialidades);
        console.log("Cargaron Las Especialidades !", especialidades);
      } catch (error) {
        console.error("Error al Cargar las Especialidades", error);
      }
    }
    fetchDataAsync();
  }, []);
    //####################################### ASESORES

    useEffect(() => {
      // Cargar los datos iniciales al montar el componente
      async function fetchDataAsync() {
        try {
          const asesores = await fetchData(nombreasesores);
          setAsesores(asesores);
          console.log("Cargaron Los Asesores !", asesores);
        } catch (error) {
          console.error("Error al Cargar los Asesores", error);
        }
      }
      fetchDataAsync();
    }, []);
//#############################
  useEffect(() => {
    // Realiza una solicitud GET a la API de Strapi para obtener la lista de documentos
    async function fetchDocuments() {
      try {
        //http://localhost:1337/api/upload/files/
        const response = await axios.get(`${direccionapi}${nombredocumentos}`); // Asegúrate de usar la URL correcta
        //boleano = true;
      
      } catch (error) {
        
        console.error("Error al obtener la lista de documentos:", error);
      }
    }

    fetchDocuments();
  }, []);

  const handleCreate = async (dato) => {
    
    try {
      if (!selectedFile) {
        console.log("Selecciona un archivo PDF antes de cargarlo.");
        const successMessage = "Selecciona un archivo PDF antes de cargarlo.";
        alert(successMessage);
        return;
      }
      const formData = new FormData();
      formData.append("files", selectedFile);

      try {
        //'http://localhost:1337/api/upload'
        const response = await axios.post(
          `${direccionapi}${contenidodocumento}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // El archivo se ha cargado con éxito
          const estado = 'En revision';
          const observaciones = 'En proceso de observaciones'

          console.log("Archivo PDF cargado con éxito.");
          setUploadedFileName(selectedFile.name);
          const namedocs = selectedFile.name;
          const fileId = response.data[0].id;
          setDocumentId(fileId);

          await createData(newItem, nombretabla, fileId.toString(), namedocs,estado.toString(),observaciones.toString());

          const updatedData2 = await fetchData(nombretabla);
          const lastIndex = updatedData2.data.length - 1;
          const lastItem = updatedData2.data[lastIndex];
          const lastItemId = lastItem.id;
          

          setDocumentoCargado(true);
          console.log("ID del último elemento:", lastItemId);
        }
      } catch (error) {
        console.error("Error al cargar el archivo PDF:", error);
        const successMessage = "Error al cargar el archivo PDF";
        alert(successMessage);
      }

      // Actualizar la lista después de crear
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);

      // Limpiar los campos
      setNewItem({
        nombre: "",
        ncontrol: "",
        nombre_anteproyecto: "",
        periodo: "",
        empresa: "",
        asesorE: "",
        carrera: "",
      });
    } catch (error) {
      console.error("Error al crear el elemento:", error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    // Obtener los datos del elemento en edición
    const itemToEdit = data.data.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem({
        nombre: itemToEdit.attributes.nombre,
        ncontrol: itemToEdit.attributes.ncontrol,
        nombre_anteproyecto: itemToEdit.attributes.nombre_anteproyecto,
        periodo: itemToEdit.attributes.periodo,
        empresa: itemToEdit.attributes.empresa,
        asesorE: itemToEdit.attributes.asesorE,
         carrera: itemToEdit.attributes.carrera,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      if (editingId) {
        await updateData(editingId, newItem, nombretabla);
        // Actualizar la lista después de actualizar
        const updatedData = await fetchData(nombretabla);
        setData(updatedData);
        // Limpiar los campos y salir del modo de edición
        setNewItem({
          nombre: "",
          ncontrol: "",
          nombre_anteproyecto: "",
          periodo: "",
          empresa: "",
          asesorE: "",
          carrera: "",
        });
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error al actualizar el elemento:", error);
    }
  };

  const handleDelete = async (elementId, documentId) => {
    try {
      // Primero, elimina el elemento de la tabla
      await deleteData(elementId, nombretabla);
      // Luego, elimina el documento http://localhost:1337/api/upload/files/
      await axios.delete(`${direccionapi}${nombredocumentos}${documentId}`);
      console.log("Esto es docuemtno id", documentId);
      // Actualiza la lista de datos y documentos después de la eliminación
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
      setDocumentoCargado(false);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

 

  //#################
  const handleEditDocument = async (idori, documentId) => {
    //
    //console.log('IDE DOCUMENTO',documentId);
    // Paso 1: Eliminar el documento existente http://localhost:1337/api/upload/files/

    console.log("IDE DOCUMENTO", documentId);

    try {
      // Paso 2: Cargar un nuevo documento
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";
      fileInput.click();

      fileInput.addEventListener("change", async (event) => {
        const newDocument = event.target.files[0];
    await axios.delete(`${direccionapi}${nombredocumentos}${documentId}`);

        if (newDocument) {
          const formData = new FormData();
          formData.append("files", newDocument);

          try {
            //'http://localhost:1337/api/upload'
            const response = await axios.post(
              `${direccionapi}${contenidodocumento}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.status === 200) {
              // El nuevo documento se ha cargado con éxito
              const newDocumentId = response.data[0].id;
              // Aquí puedes guardar newDocumentId en una variable si lo necesitas
              // console.log('Nuevo documento ID:', newDocumentId);
              // const namedocs = selectedFile.name;
              const itemToEdit = data.data.find((item) => item.id === idori);
              console.log("Nuevo documento ID2:", itemToEdit);
              console.log("Nuevo documento ID:", newDocument.name);

              try {
                await updateDataDoc(
                  idori,
                  itemToEdit,
                  nombretabla,
                  newDocumentId.toString(),
                  newDocument.name
                );

                setDocumentoCargado(true);
              } catch (error) {
                console.error("Error al actualizar el Documento:", error);
              }
              // Actualiza la lista de elementos o realiza cualquier otra acción necesaria
            }
          } catch (error) {
            console.error("Error al cargar el nuevo documento:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error al editar el documento:", error);
    }
    //console.log('IDE DOCUMENTO',documentId);
  };

  //#################


  const pruebas = async (datos) => {
  
    console.log("doc2",datos)
  };


  return (
    <div className="contenido__anteproyectosubir">
      <div className="Anteproyectosubir__titulo">
        <h1>Anteproyecto De Residencia Profesional</h1>
      </div>
      <div className="Anteproyectosubir__preguntas">
        <div className="contenido__preguntas">
          <div className="informacion__pregunta">
            <span>Nombre Completo:</span>
            <input
              type="text"
              placeholder="Nombre"
              value={newItem.nombre}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre: e.target.value })
              }
            />
            <span>Número de control:</span>
            <input
              type="text"
              placeholder="Numero de control"
              value={newItem.ncontrol}
              onChange={(e) =>
                setNewItem({ ...newItem, ncontrol: e.target.value })
              }
            />
            <span>Nombre del Anteproyecto:</span>
            <input
              type="text"
              placeholder="Nombre AnteProyecto"
              value={newItem.nombre_anteproyecto}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre_anteproyecto: e.target.value })
              }
            />
          </div>
          <div className="informacion__pregunta">
            <span>Periodo de realización:</span>
            <input
              type="text"
              placeholder="periodo"
              value={newItem.periodo}
              onChange={(e) =>
                setNewItem({ ...newItem, periodo: e.target.value })
              }
            />
            <span>Nombre de la empresa:</span>
            <input
              type="text"
              placeholder="empresa"
              value={newItem.empresa}
              onChange={(e) =>
                setNewItem({ ...newItem, empresa: e.target.value })
              }
            />
     <span>Asesor:</span>
     <select
        value={newItem.asesorE}
        onChange={(e) =>
          setNewItem({ ...newItem, asesorE: e.target.value })
        }
      >
        <option value="">Selecciona un Asesor</option>
        {asesores && asesores.data.map((asesor) => (
          <option key={asesor.id} value={asesor.attributes.nombre}>
            {asesor.attributes.nombre}
          </option>
        ))}
      </select>

     <span>Carrera:</span>
     <select
        value={newItem.carrera}
        onChange={(e) =>
          setNewItem({ ...newItem, carrera: e.target.value })
        }
      >
        <option value="">Selecciona una carrera</option>
        {especialidades && especialidades.data.map((especialidad) => (
          <option key={especialidad.id} value={especialidad.attributes.nombre}>
            {especialidad.attributes.nombre}
          </option>
        ))}
      </select>
          </div>
        </div>
        <div className="subiranteproyecto__upload">
          <h1>Cargar Archivo PDF</h1>
          <input type="file" accept=".pdf" onChange={handleFileChange} />

          {uploadedFileName && <p>Archivo cargado: {uploadedFileName}</p>}

          {editingId ? (
            <>
              <button onClick={handleUpdate}>Actualizar</button>
              <button onClick={() => setEditingId(null)}>Cancelar</button>
            </>
          ) : (
            <button onClick={handleCreate}>Crear</button>
          )}
        </div>
        <div className="informacion__tabla">
          <table border="1">
            <thead>
              <tr>
                <th>Número de Control</th>
                <th>Nombre</th>
                <th>Nombre de Anteproyecto</th>
                <th>Nombre de documento</th>
                <th>Esatado</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.attributes.ncontrol}</td>
                    <td>{item.attributes.nombre}</td>
                    <td>{item.attributes.nombre_anteproyecto}</td>
                    <td>{item.attributes.namedoc}</td>
                    <td>{item.attributes.estado}</td>
                    <td>{item.attributes.carrera}</td>
                    <td>
                      <button className="btnsubir" onClick={() => handleEdit(item.id)}>
                        Editar Información
                      </button>
                      <button   className="btnsubir"
                        onClick={() =>
                          handleEditDocument(
                            item.id,
                            item.attributes.iddocumento
                          )
                        }
                      >
                        Editar Doc
                      </button>
                      <button   className="btnsubir"
                        onClick={() =>
                          handleDelete(item.id, item.attributes.iddocumento)
                        }
                      >
                        Eliminar
                      </button>
                      
                    
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="observaciones">
         
          {data &&
                data.data.map((item) => (
                  <tr key={item.id}>
                    <span>Observaciones:</span>
                    <textarea name="textarea" placeholder={item.attributes.observaciones} readOnly />
                  </tr>
                ))}
        </div>
    
      </div>
    </div>
  );
}

export default App;
