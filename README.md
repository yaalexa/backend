# Backend de Gestión de Personas y Módulos - Documentación

## 1. Introducción
Este proyecto es un sistema backend diseñado para gestionar personas y módulos en un entorno de acuicultura. Proporciona una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre personas y módulos, así como funcionalidades adicionales como autenticación y autorización.

---

## 2. Instalación

### Requisitos Previos
- **Node.js**: v16 o superior.
- **MySQL**: Base de datos para almacenar la información.
- **npm**: Gestor de paquetes de Node.js.

### Instrucciones de Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/theAranda88/BackMejorado.git
   cd BackMejorado
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   DB_HOST=bsnvfs9rpxegu1v03g92-mysql.services.clever-cloud.com
   DB_USER=u8bocyog95qdluk0
   DB_PASSWORD=5CLBmtgCv00tHkPvEyJH
   DB_NAME=bsnvfs9rpxegu1v03g92
   DB_PORT=3306
   JWT_SECRET=miSuperSecreto123
   PORT=3000
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

---

## 3. Uso

### Iniciar el Servidor
Para iniciar el servidor, ejecuta:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

---

## 4. Endpoints

### URL en despliegue
- **https://backmejorado.onrender.com**

### Autenticación
- **POST /api/users/loginMVC**
  - **Descripción**: Inicia sesión con un correo electrónico y contraseña.
  - **Parámetros**:
    ```json
    {
      "email": "usuario@example.com",
      "password": "contraseña"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Inicio de sesión exitoso",
      "token": "jwt_token",
      "user": {
        "id": 1,
        "identificacion": "123456789"
      }
    }
    ```

- **POST /api/users/cerrarSecionMVC**
  - **Descripción**: Cierra la sesión del usuario actual.
  - **Respuesta**:
    ```json
    {
      "message": "Sesión cerrada exitosamente"
    }
    ```

### Personas
- **GET /api/users/listarpersonasMVC**
  - **Descripción**: Obtiene una lista de todas las personas registradas.
  - **Respuesta**:
    ```json
    [
      {
        "id_persona": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com",
        "n_documento_identidad": "123456789",
        "sede": "Sede Principal",
        "rol": "Usuario"
      }
    ]
    ```



- **GET /api/users/personaidMVC/:id**
  - **Descripción**: Obtiene la persona registrada por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
        "id_persona": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com",
        "n_documento_identidad": "123456789",
        "sede": "Sede Principal",
        "rol": "Usuario"
      }
    ]
    ```   

- **POST /api/users/registerMVC**
  - **Descripción**: Registra una nueva persona en el sistema.
  - **Parámetros**:
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "password": "contraseña",
      "n_documento_identidad": "123456789",
      "sede": "Sede Principal",
      "rol": 3,
      "n_ficha": "F123",
      "jornada": "Mañana",
      "nombre_del_programa": "Programa de Acuicultura"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Persona registrada exitosamente"
    }
    ```

- **GET /api/users/listarusuariosMVC**
  - **Descripción**: Obtiene una lista de todos los usuarios registrados.
  - **Respuesta**:
    ```json
    [
       {
        "id_persona": 2,
        "n_ficha": "F101",
        "jornada": "Mañana",
        "nombre_del_programa": "Acuicultura Sostenible"
    }
    ]
    ```  

- **GET /api/users/listarinstructoresMVC**
  - **Descripción**: Obtiene una lista de todos los instructores registrados.
  - **Respuesta**:
    ```json
    [
       {
        "id_persona": 1,
        "n_ficha": "F123",
        "nombre_del_programa": "Gestión de Recursos Acuáticos"
       }
    ]
    ``` 

- **PUT /api/users/:id**
  - **Descripción**: Editar el recurso persona por medio de su id.
  - **Parámetros**:
    ```json
    {
        "nombre": "Juan Pérez Actualizado",
        "email": "juan.actualizado@example.com",
        "password": "nuevacontraseña",
        "n_documento_identidad": "123456789",
        "sede": "Sede Actualizada",
        "id_rol": 2
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Persona se actualizó correctamente"
    }
    ```

- **DELETE /api/users/:id**
  - **Descripción**: Elimnar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [
       {
        "message": "Persona elimnada existosamente"
       }
    ]
    ``` 

### Módulos
- **GET /api/modulos/listarModuloMVC**
  - **Descripción**: Obtiene una lista de todos los módulos registrados.
  - **Respuesta**:
    ```json
    [
      {
        "id_modulo": 1,
        "nombre": "Módulo 1",
        "ubicacion": "Ubicación 1",
        "especie_pescados": "Tilapia",
        "cantidad_pescados": 100,
        "edad_pescados": 6,
        "dimensiones": "10x10x10"
      }
    ]
    ```

- **POST /api/modules/registerModMVC**
  - **Descripción**: Registra un nuevo módulo en el sistema.
  - **Parámetros**:
    ```json
    {
      "nombre": "Módulo 2",
      "ubicacion": "Ubicación 2",
      "especie_pescados": "Trucha",
      "cantidad_pescados": 150,
      "edad_pescados": 8,
      "dimensiones": "15x15x15",
      "id_persona": 1
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Módulo registrado exitosamente"
    }
    ```

- **GET /api/modulo/moduloIdMVC/:id**
  - **Descripción**: Obtiene el modulo registrado por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
            "id_modulo": 1,
            "nombre": "modulo10101010",
            "ubicacion": "SenaAgro",
            "especie_pescados": "tilapia",
            "cantidad_pescados": "50",
            "edad_pescados": "2 meses",
            "dimensiones": "2x2mts",
            "id_persona_modulo": 1,
            "nombre_persona_modulo": "Juan Pérez",
            "id_persona_asignada": 1,
            "nombre_persona_asignada": "Juan Pérez"
        }
    ]
    ```
- **PUT /api/modulos/editarModuloMVC/:id**
  - **Descripción**: Editar el recurso modulo por medio de su id.
  - **Parámetros**:
    ```json
    {
        "nombre": "modulo00000",
        "ubicacion": "SenaAgro",
        "especie_pescados": "tilapia",
        "cantidad_pescados": "50",
        "edad_pescados": "2 meses",
        "dimensiones": "2x2mts",
        "id_persona": 1
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Modulo actualizado correctamente"
    }
    ```

- **DELETE /api/modulo/eliminarModuloMVC/:id**
  - **Descripción**: Elimnar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [
       {
        "message": "Modulo eliminado existosamente"
       }
    ]
    ``` 
---

### Bitacoras
- **GET /api/bitacora/listarBitacora**
  - **Descripción**: Obtiene una lista de todos las bitacoras registradas.
  - **Respuesta**:
    ```json
    [
      {
        "id_bitacora": 1,
        "id_modulo": 1,
        "fecha": "1003-10-15T04:56:16.000Z",
        "descripcion": "Descripción MOdificada"
      },
    ]
    ```

- **POST /api/bitacora/registrar**
  - **Descripción**: Registra una nueva bitacora en el sistema.
  - **Parámetros**:
    ```json
    {
      "id_modulo": 1,
      "fecha": "2025-10-15",
      "descripcion": "Descripción de la entrada"
    }
    ```
  - **Respuesta**:
    ```json
    {
          "id_bitacora": 5,
          "message": "Entrada de bitácora creada exitosamente"
    }
    ```

- **GET /api/bitacora/buscarPorId/:id**
  - **Descripción**: Obtiene la bitacora registrada por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
        "id_bitacora": 1,
        "id_modulo": 1,
        "fecha": "1003-10-15T04:56:16.000Z",
        "descripcion": "Descripción MOdificada"
        }
    ]
    ```
- **PUT /api/bitacora/editar/:id**
  - **Descripción**: Editar el recurso modulo por medio de su id.
  - **Parámetros**:
    ```json
    {
      "id_modulo": 1,
      "fecha": "2025-10-15",
      "descripcion": "Descripción editada"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Entrada de bitácora actualizada exitosamente"
    }
    ```

- **DELETE /api/bitacora/borrar/:id**
  - **Descripción**: Editar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [ 
       {
        "message": "Entrada de bitácora eliminada exitosamente"
       }
    ]
    ``` 
---

## 5. Configuración

### Archivos de Configuración
- **`.env`**: Contiene las variables de entorno necesarias para la conexión a la base de datos y la configuración del servidor.
- **`db.js`**: Configura la conexión a la base de datos MySQL utilizando el paquete `mysql2`.

---

## 6. Estructura del Proyecto

```
/src
  /controllers       # Lógica de manejo de las peticiones
  /models            # Definición de los modelos de datos
  /routes            # Configuración de las rutas
  /middlewares       # Funciones de middleware
  /services          # Lógica de negocio
  /db.js             # configuracion base de datos
  /index.js          #configuracion del servidor
  /.env              # variables de entorno
  /package-lock.json       # Configuraciones del proyecto
  /package.json            # Configuraciones del proyecto
```

---

## 7. Pruebas

### Pruebas Unitarias
Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
```bash
npm test
```

---

## 8. Despliegue

### Despliegue en Producción
1. Configura un servidor (por ejemplo, AWS, DigitalOcean, Heroku).
2. Clona el repositorio en el servidor.
3. Configura las variables de entorno en el servidor.
4. Inicia el servidor con `npm start` o utiliza un proceso manager como `PM2`.

---

## 9. Contribución

### Cómo Contribuir
1. Clona el repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Añade nueva funcionalidad"
   ```
4. Envía un pull request.

---
## 10. Contacto
- **Autor**: Daniel Aranda
- **Correo Electrónico**: thearanda88@gmail.com
- **Repositorio**: [GitHub](https://github.com/theAranda88/BackMejorado.git)

---

