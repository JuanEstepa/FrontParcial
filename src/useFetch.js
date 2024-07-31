import { useEffect, useState } from "react"; // Importa los hooks useEffect y useState desde React

/**
 * Hook personalizado para realizar una solicitud GET a una URL y gestionar el estado de los datos, errores y carga.
 */
export function useFetch(url) {
  const [data, setData] = useState(null); // Estado para almacenar los datos obtenidos de la solicitud
  const [error, setError] = useState(null); // Estado para almacenar cualquier error que ocurra durante la solicitud
  const [loading, setLoading] = useState(true); // Estado para indicar si la solicitud está en curso

  useEffect(() => {
    // Hook useEffect para realizar la solicitud cuando la URL cambia
    setLoading(true); // Establece el estado de carga en true al iniciar la solicitud
    fetch(url) // Realiza la solicitud GET a la URL especificada
      .then((res) => res.json()) // Parsea la respuesta a JSON
      .then((data) => {
        // Gestiona los datos obtenidos
        setData(data.data); // Almacena los datos en el estado
        console.log(data.data);
        setLoading(false); // Establece el estado de carga en false una vez completada la solicitud
      })
      .catch((error) => {
        // Gestiona cualquier error que ocurra durante la solicitud
        setError(error); // Almacena el error en el estado
        setLoading(false); // Establece el estado de carga en false
      });
  }, [url]); // Se ejecuta cada vez que la URL cambia

  return { data, error, loading }; // Retorna un objeto que contiene los datos, el error y el estado de carga
}

/**
 * Hook personalizado para realizar una solicitud GET a una URL y buscar un elemento por su ID.
 */
export function useFindById(url) {
  const [data, setData] = useState(null); // Estado para almacenar los datos obtenidos de la solicitud
  const [error, setError] = useState(null); // Estado para almacenar cualquier error que ocurra durante la solicitud

  useEffect(() => {
    // Hook useEffect para realizar la solicitud cuando se monta o actualiza el componente
    fetch(url) // Realiza la solicitud GET a la URL especificada
      .then((res) => res.json()) // Parsea la respuesta a JSON
      .then((data) => setData(data)) // Almacena los datos en el estado
      .catch((error) => setError(error)); // Almacena cualquier error en el estado
  });

  return { data, error }; // Retorna un objeto que contiene los datos y el error
}
