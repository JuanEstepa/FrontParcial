import NavBar from "../components/NavBar";
import { useState } from "react";
import { useFetch, useEdit } from "../useFetch";

const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    image: "",
  });

  const [selectedId, setSelectedId] = useState(null);

  const { data } = useFetch("https://apitallerrestaurante.onrender.com/dishes");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = async (e) => {
    const id = e.target.value;

    setSelectedId(id);

    if (id !== "nn") {
      const response = await fetch(
        `https://apitallerrestaurante.onrender.com/dishes/${id}`
      );
      const result = await response.json();
      const plato = result.data;

      setFormData({
        name: plato.name,
        price: plato.price,
        type: plato.type,
        description: plato.description,
        image: plato.image,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        type: "",
        description: "",
        image: "",
      });
    }
  };

  const useSubmit = async (e) => {
    e.preventDefault();
    try {
      await useEdit(
        `https://apitallerrestaurante.onrender.com/dishes/${selectedId}`,
        formData
      );
      // Aquí puedes realizar alguna acción después de guardar los datos exitosamente
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <div>
      <NavBar page="Editar plato" />
      <div className="container mx-auto px-4">
        <form onSubmit={useSubmit} className="max-w-lg mx-auto mt-10">
          <div className="mb-6">
            <label htmlFor="id" className="block text-white font-semibold mb-2">
              Id
            </label>
            <select
              required
              className="form-control w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
              id="id"
              onChange={handleSelectChange}
            >
              <option value="nn">Selecciona un id</option>
              {data &&
                data.map((dish) => (
                  <option key={dish._id} value={dish._id}>
                    {dish._id}
                  </option>
                ))}
            </select>
          </div>
          {["name", "price", "type", "description", "image"].map((field) => (
            <div className="mb-6" key={field}>
              <label
                htmlFor={field}
                className="block text-white font-semibold mb-2"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "type" ? (
                <select
                  required
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
                >
                  <option value="Entrada">Entrada</option>
                  <option value="Principal">Principal</option>
                  <option value="Postre">Postre</option>
                </select>
              ) : field === "description" ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
                ></textarea>
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
                />
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-800/50 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
