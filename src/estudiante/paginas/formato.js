import axios from 'axios';

const apiUrl = 'http://localhost:1337';
//const tabla = 'api/dato1s';

//METODO PARA VER
export async function fetchData(nametable) {
    try {
      const response = await fetch(`${apiUrl}/${nametable}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  //METODO PARA CREAR
  export async function createData(newItem,nametable,prueba) {
    try {
      const requestData = {
        data: {
          ...newItem,
          iddocumento: prueba
        },
      };
      
      console.log('Esto es prueba', prueba);
      const response = await fetch(`${apiUrl}/${nametable}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const successMessage = 'Elemento creado con éxito';
        alert(successMessage);
        return true;
      } else {
        const errorMessage = 'Error al crear el elemento: ' + response.statusText;
        alert(errorMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      throw error;
    }
  }
  //METODO PARA ACTUALIZAR
  export async function updateData(id, updatedData,nametable) {
    try {
      const requestData = {
        data: {
          ...updatedData,
        },
      };
  
      const response = await fetch(`${apiUrl}/${nametable}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const successMessage = 'Elemento Actualizado con éxito';
        alert(successMessage);
        return true;
      } else {
        const successMessage = 'Error Al actualizar elemento!';
        alert(successMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      throw error;
    }
  }
  
  //METODO PARA BORRAR
  export async function deleteData(id,nametable) {
    try {
      const response = await fetch(`${apiUrl}/${nametable}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const successMessage = 'Exito borrar elemento!';
        alert(successMessage);
        return true;
      } else {
        const successMessage = 'Error borrar elemento!';
        alert(successMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      throw error;
    }
  }
//CREAR FUNTION  
//USANDO AXIOS
//METODO PARA CREAC CON AXIOS
  export async function conaxios(newItem, nametable) {
    try {
      const requestData = {
        data: {
          ...newItem,
        },
      };
  
      const response = await axios.post(`${apiUrl}/${nametable}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        return true;
      } else {
        console.error('Error al crear el elemento:', response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      throw error;
    }
  }

//METODO PARA VER CON AXIOS

export async function verAxios(nametable) {
    try {
      const response = await axios.get(`${apiUrl}/${nametable}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

//ACTUALIZAR CON AXIOS


export async function METODOPUT(id, updatedData, nametable) {
  try {
    const requestData = {
      data: {
        ...updatedData,
      },
    };

    const response = await axios.put(`${apiUrl}/${nametable}/${id}`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      console.error('Error al actualizar el elemento:', response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error al actualizar el elemento:', error);
    throw error;
  }
}

//BORRAR CON AXIOS


export async function BorrarAxios(id, nametable) {
  try {
    const response = await axios.delete(`${apiUrl}/${nametable}/${id}`);
    if (response.status === 200) {
      return true;
    } else {
      console.error('Error al eliminar el elemento:', response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error al eliminar el elemento:', error);
    throw error;
  }
}
