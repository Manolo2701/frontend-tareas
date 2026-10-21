# Gestor de tareas — frontend

Aplicación frontend desarrollada con React y Vite para gestionar tareas a través de una API REST local creada con Node.js y Express.

> **Proyecto de práctica:** el frontend espera que la API esté disponible en `http://localhost:3000`. Los datos se guardan en un archivo JSON del backend, no en una base de datos.

## Funcionalidades

- Consultar la lista de tareas.
- Crear tareas.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas.
- Mostrar estados de carga y errores de conexión.

## Tecnologías

- React
- JavaScript
- Vite
- CSS
- Fetch API

## Repositorio del backend

[API de Tareas — Node.js + Express](https://github.com/Manolo2701/api-tareas)

## Requisitos

- Node.js y npm
- El backend de la API de tareas ejecutándose en el puerto 3000

## Instalación y ejecución

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/Manolo2701/frontend-tareas.git
   cd frontend-tareas
   npm install
   ```

2. Inicia el backend en una terminal independiente. Consulta su README para instalarlo y ejecutarlo; por defecto escucha en `http://localhost:3000`.

3. Inicia el frontend:

   ```bash
   npm run dev
   ```

4. Abre la URL que muestre Vite en la terminal, normalmente `http://localhost:5173`.

## Comprobaciones

Crear una compilación de producción:

```bash
npm run build
```

Ejecutar ESLint:

```bash
npm run lint
```

## Alcance

Este proyecto se centra en el consumo de una API REST desde React y en el manejo de estado, formularios, peticiones asíncronas y errores. El almacenamiento y las operaciones de datos pertenecen al repositorio del backend.

## Autor

**Manuel Barbado**  
[GitHub](https://github.com/Manolo2701) · [LinkedIn](https://www.linkedin.com/in/manuel-ramiro-barbado-s%C3%A1nchez-7404b5345/)
