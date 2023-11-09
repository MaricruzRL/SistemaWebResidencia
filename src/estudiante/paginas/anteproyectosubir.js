import React, { useState, useEffect } from "react";
import {
  fetchData,
  createData,
  updateData,
  deleteData /*, conaxios*/,
} from "./formato";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [newItem, setNewItem] = useState({
    nombre: "",
    ncontrol: "",
    nombre_anteproyecto: "",
    periodo: "",
    empresa: "",
    asesorE: "",
  });
  const [editingId, setEditingId] = useState(null); // ID del elemento en edición

  const [documentId, setDocumentId] = useState(null);

  const [documents, setDocuments] = useState([]);

  //pruebas de importacion
  const nombretabla = "api/residentesuploads";
  const nombredocumentos = "api/upload/files/";
  //#####################################
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

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
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchDataAsync();
  }, []);

  useEffect(() => {
    // Realiza una solicitud GET a la API de Strapi para obtener la lista de documentos
    async function fetchDocuments() {
      try {
        const response = await axios.get(
          `http://localhost:1337/${nombredocumentos}`
        ); // Asegúrate de usar la URL correcta
        setDocuments(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de documentos:", error);
      }
    }

    fetchDocuments();
  }, []);

  const handleCreate = async () => {
    try {
      if (!selectedFile) {
        const successMessage = "Porfavor carge un archivo";
        alert(successMessage);
        return;
      }

      const formData = new FormData();
      formData.append("files", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:1337/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // El archivo se ha cargado con éxito
          console.log("Archivo PDF cargado con éxito.");
          setUploadedFileName(selectedFile.name);
          const fileId = response.data[0].id;
          setDocumentId(fileId);

          await createData(newItem, nombretabla, fileId.toString());
        }
      } catch (error) {
        console.error("Error al cargar el archivo PDF:", error);
      }

      // Actualizar la lista después de crear
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
      // Limpiar los campos
      setNewItem({ title: "", descrpcion: "" });
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
        title: itemToEdit.attributes.title,
        descrpcion: itemToEdit.attributes.descrpcion,
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
        setNewItem({ title: "", descrpcion: "" });
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

      // Luego, elimina el documento
      await axios.delete(
        `http://localhost:1337/api/upload/files/${documentId}`
      );
      console.log("Esto es docuemtno id", documentId);
      // Actualiza la lista de datos y documentos después de la eliminación
      const updatedData = await fetchData(nombretabla);
      setData(updatedData);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  //#################

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
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, nombre: e.target.value })
              }
            />
            <span>Número de control:</span>
            <input
              type="text"
              placeholder="Numero de control"
              value={newItem.descrpcion}
              onChange={(e) =>
                setNewItem({ ...newItem, ncontrol: e.target.value })
              }
            />
            <span>Nombre del Anteproyecto:</span>
            <input
              type="text"
              placeholder="nombre_anteproyecto"
              value={newItem.title}
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
              value={newItem.descrpcion}
              onChange={(e) =>
                setNewItem({ ...newItem, periodo: e.target.value })
              }
            />
            <span>Nombre de la empresa:</span>
            <input
              type="text"
              placeholder="empresa"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, empresa: e.target.value })
              }
            />
            <span>Asesor Externo:</span>
            <input
              type="text"
              placeholder="Asesor externo"
              value={newItem.descrpcion}
              onChange={(e) =>
                setNewItem({ ...newItem, asesorE: e.target.value })
              }
            />
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
        {data &&
          data.data.map((item) => (
            <div key={item.id}>
              <p>ID: {item.id}</p>
              <p>Nombre: {item.attributes.nombre}</p>
              <p>Numero de control: {item.attributes.ncontrol}</p>
              <p>ID del documento enlazado: {item.attributes.iddocumento}</p>

              {/* Mapear solo los documentos que coinciden con el ID del documento enlazado (convertido a número) */}
              {documents
                .filter(
                  (document) =>
                    document.id ===
                    (typeof item.attributes.iddocumento === "string"
                      ? parseInt(item.attributes.iddocumento, 10)
                      : item.attributes.iddocumento)
                )
                .map((document) => (
                  <div key={document.id}>
                    <p>Nombre: {document.name}</p>
                    {/* Agrega aquí otros campos que desees mostrar para los documentos */}
                  </div>
                ))}

              <button onClick={() => handleEdit(item.id)}>Editar</button>
              <button
                onClick={() =>
                  handleDelete(item.id, item.attributes.iddocumento)
                }
              >
                Eliminar
              </button>
            </div>

          ))}
                  </div>

      </div>
    </div>
  );
}

export default App;
