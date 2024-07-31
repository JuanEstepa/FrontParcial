import NavBar from "../components/NavBar"; // Importa el componente NavBar desde la ruta especificada
import { useFetch } from "../useFetch"; // Importa la función useFetch desde el archivo useFetch.js

const Practicas = () => {
  // Define el componente Practicas como una función de flecha
  const { data, error, loading } = useFetch(
    // Utiliza la función useFetch para obtener datos de la URL especificada
    "http://localhost:8080/practice"
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Retorna el JSX que representa la interfaz de usuario
  return (
    <>
      <NavBar page="Practicas" />
      {error && <h1>Error: {error.message}</h1>}
      {loading && <h1>Loading</h1>}
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {data != null && data.length > 0 ? ( // Verifica si hay datos antes de realizar el mapeo
            data.map(
              (
                practice // Mapea los datos y renderiza un div para cada plato
              ) => (
                <div
                  key={practice.id} // Asigna la clave única del plato como el ID del plato
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" // Renderiza un div con clases de tailwindcss para estilizar el plato
                >
                  <div className="p-5">
                    <p className="mb-3 font-bold text-gray-900 dark:text-white">
                      # 1
                    </p>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {practice.destination}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Salida: {formatDate(practice.startDate)}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      LLegada: {formatDate(practice.endDate)}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Profesor: {practice.teacher.name}{" "}
                      {practice.teacher.lastName}
                    </p>
                  </div>
                </div>
              )
            )
          ) : (
            <h1 className="text-white">No hay practicas inscritas</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Practicas; // Exporta el componente Practicas como el componente predeterminado de este archivo
