# Presupuestos App

Una aplicación para generar, gestionar y compartir presupuestos de manera sencilla. Los presupuestos se pueden guardar, eliminar y compartir mediante enlaces generados dinámicamente. Además, los datos tienen persistencia en el almacenamiento local del navegador.

## 🚀 Características

- Generación de presupuestos personalizados.
- Persistencia de datos en el `localStorage`.
- Compartir presupuestos mediante enlaces generados dinámicamente.
- Eliminar presupuestos con notificaciones de confirmación.
- Interfaz moderna y fácil de usar, diseñada con `styled-components`.
- Notificaciones visuales con `react-toastify`.

---

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz.
- **TypeScript**: Tipado estático para mayor robustez y escalabilidad.
- **React Router**: Manejo de rutas y parámetros en la URL.
- **Styled-components**: Estilización de componentes con CSS-in-JS.
- **React-icons**: Iconos para botones y elementos visuales.
- **React-toastify**: Notificaciones visuales para el usuario.
- **Vite**: Herramienta de desarrollo rápida para aplicaciones React.

---

## ⚙️ Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado. Luego, ejecuta:
```bash
npm install
```

### 3. Ejecutar el proyecto en modo desarrollo
```bash
npm run dev
```

Esto iniciará un servidor de desarrollo. Abre tu navegador y ve a http://localhost:5173 para ver la aplicación.

### 4. Construir para producción
Si deseas generar una versión optimizada para producción, ejecuta:
```bash
npm run build
```
Los archivos generados estarán en la carpeta dist/.

## 🧑‍💻 Cómo usar la aplicación
1- Generar un presupuesto:
- Selecciona los servicios deseados.
- Completa los datos del cliente (nombre, email, teléfono).
- Haz clic en "Generar presupuesto".
  
2- Compartir un presupuesto:
- Haz clic en el botón de compartir (icono de enlace).
- El enlace se copiará automáticamente al portapapeles.

3- Eliminar un presupuesto:
- Haz clic en el botón de eliminar (icono de papelera).
- Aparecerá una notificación confirmando la eliminación.

4- Persistencia de datos:
- Los presupuestos generados se guardan automáticamente en el localStorage.
- Al recargar la página, los presupuestos se cargarán automáticamente.

## 📦 Dependencias principales
- react: ^18.x
- react-router-dom: ^6.x
- styled-components: ^5.x
- react-icons: ^4.x
- react-toastify: ^9.x
- vite: ^4.x

## 📝 Notas adicionales
- Si encuentras algún problema o tienes sugerencias, no dudes en abrir un issue en el repositorio.
- Esta aplicación es un proyecto educativo y puede ser extendida con nuevas funcionalidades según las necesidades.


---

### **¿Qué incluye este README?**
1. **Descripción del proyecto**: Una breve introducción sobre lo que hace la aplicación.
2. **Características**: Lista de las funcionalidades principales.
3. **Tecnologías utilizadas**: Herramientas y bibliotecas clave.
4. **Instrucciones de instalación y ejecución**: Pasos claros para ejecutar el proyecto.
5. **Guía de uso**: Cómo interactuar con la aplicación.
6. **Dependencias principales**: Lista de las bibliotecas utilizadas.
7. **Notas adicionales**: Información sobre contribuciones y problemas.