// =============================================================================
// src/hooks/useApi.js  →  HOOK PERSONALIZADO PARA CONSUMIR CUALQUIER API (GET)
// =============================================================================
// Un "custom hook" es una función que empieza con "use" y reutiliza lógica
// con hooks de React. Este hace el fetch a una URL y devuelve:
//   data    → lista con los datos recibidos
//   loading → true mientras carga (para mostrar el spinner)
//   error   → mensaje de error (o null si todo salió bien)
//   reload  → función para volver a pedir los datos (reintentar / pull-to-refresh)
//
// ★ ES GENÉRICO: para otra API NO suele hacer falta cambiarlo, solo la URL
//   que se le pasa desde Datos.jsx. Ver nota más abajo sobre la línea "const list".
// =============================================================================

// useState    → guardar valores que al cambiar redibujan la pantalla.
// useEffect   → ejecutar código cuando el componente aparece / cambia algo.
// useCallback → "memoriza" una función para que no se re-cree en cada render.
import { useState, useEffect, useCallback } from "react";

// Recibe la URL de la API como parámetro.
export default function useApi(url) {
  // Datos de la API. Empieza como arreglo vacío [].
  const [data, setData] = useState([]);
  // Empieza en true porque al abrir la pantalla ya se está cargando.
  const [loading, setLoading] = useState(true);
  // Guarda el mensaje de error si falla la petición.
  const [error, setError] = useState(null);

  // Función que hace la petición. useCallback con [url] hace que solo se
  // re-cree si la URL cambia.
  const load = useCallback(async () => {
    // Antes de pedir: mostrar "cargando" y limpiar errores anteriores.
    setLoading(true);
    setError(null);
    try {
      // 1) Petición HTTP GET a la API.
      const response = await fetch(url);

      // 2) response.ok es false si el servidor respondió 404, 500, etc.
      //    Si falla, lanzamos un error que cae en el catch.
      if (!response.ok) throw new Error("Error " + response.status);

      // 3) Convertimos el cuerpo de la respuesta de texto a objeto JSON.
      const json = await response.json();

      // 4) ★ NORMALIZAR LA RESPUESTA A UN ARREGLO (para que FlatList funcione):
      //    - Si la API ya devuelve un arreglo [..]        → se usa tal cual (TVMaze)
      //    - Si devuelve un objeto con una propiedad "items" → se usa json.items
      //    - Si devuelve un solo objeto {..}               → se envuelve en [json]
      //    ★ SI LA NUEVA API GUARDA LA LISTA EN OTRA PROPIEDAD (por ejemplo
      //      json.results, json.data, json.characters) hay que cambiar "items"
      //      por ese nombre. Ejemplo: json.results ?? [json]
      //      (Rick & Morty usa "results"; PokeAPI usa "results"; otras usan "data").
      const list = Array.isArray(json) ? json : json.items ?? [json];

      // 5) Guardamos la lista en el estado → la pantalla se redibuja con datos.
      setData(list);
    } catch (e) {
      // Cualquier error (sin internet, JSON inválido, status != 200) llega aquí.
      setError(e.message);
    } finally {
      // finally se ejecuta SIEMPRE (haya éxito o error): quita el spinner.
      setLoading(false);
    }
  }, [url]);

  // Al montar el componente (y cuando "load" cambie, es decir, cuando cambie
  // la URL) se hace la petición automáticamente.
  useEffect(() => {
    load();
  }, [load]);

  // Lo que el componente que use el hook puede leer. "reload: load" expone
  // la función load con el nombre "reload".
  return { data, loading, error, reload: load };
}
