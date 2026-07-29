// 1. Importamos los hooks que usaremos
import { useState, useEffect } from "react";

function App() {
  // 2. Creamos el estado "tareas". Inicialmente vacío.
  const [tareas, setTareas] = useState([]);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 3. useEffect se ejecuta cuando el componente aparece en pantalla
  // useEffect(() => {
  //   fetch("http://localhost:3000/tareas")
  //     .then((respuesta) => {
  //       // 5. Convertimos la respuesta en JSON
  //       return respuesta.json();
  //     })
  //     .then((datos) => {
  //       // 6. Guardamos los datos en el estado
  //       setTareas(datos);
  //     })
  //     .catch((error) => {
  //       // 7. Si algo falla, lo mostramos en consola
  //       console.error("Error al obtener tareas:", error);
  //     });
  // }, []); // 8. El array vacío significa "solo ejecutar al montar"

  useEffect(() => {
    setCargando(true);
    fetch("http://localhost:3000/tareas")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error del servidor");
        return respuesta.json(); // ← invocamos la función
      })
      .then((datos) => {
        // ← minúscula
        setTareas(datos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "No se pudieron cargar las tareas");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const manejarEnvio = (evento) => {
    evento.preventDefault(); // Evita que el navegador recargue la página al enviar el formulario
    setError(null);

    const tituloLimpio = nuevoTitulo.trim(); // Quita espacios en blanco al inicio y final
    if (!tituloLimpio) {
      return; // Si el campo está vacío o solo espacios, no hacemos nada
    }

    fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: tituloLimpio }), // Enviamos el título como objeto JSON
    })
      .then((respuesta) => respuesta.json()) // Convertimos la respuesta en objeto JS
      .then((tareaCreada) => {
        // Añadimos la nueva tarea al array que ya tenemos en el estado
        setTareas([...tareas, tareaCreada]);
        // Limpiamos el campo de texto
        setNuevoTitulo("");
      })
      .catch((err) =>
        setError("No se pudo crear la tarea. ¿Está encendido el servidor?"),
      );
  };

  const marcarCompletada = (id) => {
    setError(null);
    // Buscamos la tarea en el estado actual
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    // Creamos un objeto actualizado invirtiendo 'completada'
    const tareaActualizada = { ...tarea, completada: !tarea.completada };

    fetch(`http://localhost:3000/tareas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completada: tareaActualizada.completada }),
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        // Actualizamos el estado local: reemplazamos la tarea antigua por la nueva
        setTareas(tareas.map((t) => (t.id === id ? tareaActualizada : t)));
      })
      .catch((err) => setError("No se pudo actualizar la tarea."));
  };

  const eliminarTarea = (id) => {
    setError(null);
    fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error al eliminar");
        return respuesta.json();
      })
      .then(() => {
        // Quitamos la tarea del estado local
        setTareas(tareas.filter((t) => t.id !== id));
      })
      .catch((err) => setError("No se pudo eliminar la tarea."));
  };

  // 9. Mostramos el título y la lista de tareas
  // return (
  //   <div>
  //     <h1>Gestor de Tareas</h1>

  //     <form onSubmit={manejarEnvio}>
  //       <input
  //         type="text"
  //         value={nuevoTitulo}
  //         onChange={(e)then => setNuevoTitulo(e.target.value)}
  //         placeholder="Escribe una nueva tarea..."
  //       />
  //       <button type="submit">Añadir</button>
  //     </form>

  //     <ul>
  //       {tareas.map((tarea) => (
  //         <li key={tarea.id}>
  //           <span
  //             style={{
  //               textDecoration: tarea.completada ? "line-through" : "none",
  //             }}
  //           >
  //             {tarea.titulo}
  //           </span>
  //           <button onClick={() => marcarCompletada(tarea.id)}>
  //             {tarea.completada ? "Marcar pendiente " : "Marcar completada"}
  //           </button>
  //           <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <h1>Gestor de Tareas</h1>

      {/* Mensaje de error global */}
      {error && <div className="error">Error: {error}</div>}

      {/* Indicador de carga */}
      {cargando ? (
        <p className="cargando">Cargando tareas...</p>
      ) : (
        <>
          {/* Formulario para añadir tarea */}
          <form onSubmit={manejarEnvio}>
            <input
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              placeholder="Escribe una nueva tarea..."
            />
            <button type="submit">Añadir</button>
          </form>

          {/* Lista de tareas */}
          {tareas.length === 0 ? (
            <p>No hay tareas. ¡Añade la primera!</p>
          ) : (
            <ul>
              {tareas.map((tarea) => (
                <li key={tarea.id}>
                  <span className={tarea.completada ? "tachado" : ""}>
                    {tarea.titulo}
                  </span>
                  <button onClick={() => marcarCompletada(tarea.id)}>
                    {tarea.completada
                      ? "Marcar pendiente"
                      : "Marcar completada"}
                  </button>
                  <button onClick={() => eliminarTarea(tarea.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default App;
