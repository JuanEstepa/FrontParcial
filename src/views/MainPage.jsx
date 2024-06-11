import NavBar from "../components/NavBar";
import { useFetch, useDelete } from "../useFetch";

const MainPage = () => {
  const { data, error, loading } = useFetch(
    "https://apitallerrestaurante.onrender.com/dishes"
  );

  function Erase(id) {
    try {
      useDelete(`https://apitallerrestaurante.onrender.com/dishes/${id}`);
      console.log("Plato eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el plato:", error);
    }
  }

  return (
    <>
      <NavBar page="Ver platos"></NavBar>
      {error && <h1>Error: {error.message}</h1>}
      {loading && <h1>Loading</h1>}
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {data &&
            data.map((dish) => (
              <div
                key={dish._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg object-cover w-full h-50"
                  src={dish.image}
                  alt={dish.name}
                />
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {dish.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {dish.description}
                  </p>
                  <p className="mb-3 font-bold text-gray-900 dark:text-white">
                    $ {dish.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => Erase(dish._id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
