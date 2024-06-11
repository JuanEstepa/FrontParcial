import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  console.log("data");

  return { data, error, loading };
}

export function useFindById(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  });

  return { data, error };
}

export function useSave(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((responseText) => {
        const responseData = JSON.parse(responseText);
        console.log(responseData);
        if (responseData.data) {
          alert("Plato agregado con éxito");
          resolve();
        } else {
          alert("Error al agregar el plato");
          reject();
        }
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
}

export function useEdit(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((responseText) => {
        const responseData = JSON.parse(responseText);
        console.log(responseData);
        if (responseData.data) {
          alert("Plato editado con éxito");
          resolve();
        } else {
          alert("Error al editar el plato");
          reject();
        }
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
}

export function useDelete(url) {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response) {
        alert("Eliminado con exito");
      }
    })
    .catch(
      (error) => {
        console.error("Error:", error);
      },
      [url]
    );
}
