import NavBar from "../components/NavBar"; // Importa el componente NavBar desde la ruta especificada
import { useFetch } from "../useFetch"; // Importa las funciones useFetch y useDelete desde el archivo useFetch.js

const Docentes = () => {
  // Define el componente MainPage como una función de flecha
  const { data, error, loading } = useFetch(
    // Utiliza la función useFetch para obtener datos de la URL especificada
    "http://localhost:8080/student"
  );

  // Retorna el JSX que representa la interfaz de usuario
  return (
    <>
      <NavBar page="Estudiantes"></NavBar>
      {error && <h1>Error: {error.message}</h1>}
      {loading && <h1>Loading</h1>}
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {data && // Verifica si hay datos antes de realizar el mapeo
            data.map(
              (
                dish // Mapea los datos y renderiza un div para cada plato
              ) => (
                <div
                  key={dish.id} // Asigna la clave única del plato como el ID del plato
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" // Renderiza un div con clases de tailwindcss para estilizar el plato
                >
                  <div className="p-5">
                    <p className="mb-3 font-bold text-gray-900 dark:text-white">
                      # {dish.id}
                    </p>
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {dish.name}
                      </h5>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {dish.lastName}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {dish.gender ? "Hombre" : "Mujer"}
                    </p>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default Docentes; // Exporta el componente MainPage como el componente predeterminado de este archivo
