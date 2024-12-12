🎨🎨 MasterpieceVault API 🎨🎨

MasterpieceVault es una API dedicada a la exhibición de las obras más icónicas de los pintores más importantes de la historia. 
Cualquier persona puede explorar las obras de arte y obtener detalles sobre cada pintura.
Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las obras de arte y los pintores, 
y se enfoca en proporcionar un acceso eficiente y escalable a la información relacionada con el arte.


### Características principales ###

## Paintings
• Cada obra de arte está asociada con un pintor específico.
• Solo los administradores pueden publicar, editar y eliminar nuevas obras

## Artists
• Cada pintor puede tener una o más obras asociadas a su id.
• Solo los administradores pueden publicar, editar y eliminar nuevos pintores


### Gestión de Usuarios y Roles ###
• Usuarios (user) y Administradores (admin).
• Los administradores tienen control total sobre el contenido y los permisos.



### Iniciación del proyecto con seeds ###

Para inicializar la base de datos con contenido inicial, se utilizaron archivos seed diseñados para las obras de arte y los pintores.

## Archivos seed

•artistsData.js: Contiene datos iniciales sobre pintores.

•Scripts de carga: artistsSeed.js: Permiten poblar la base de datos con los datos iniciales de manera sencilla.

Los scripts están organizados dentro de la carpeta utils.

Esto garantiza un entorno preconfigurado para el desarrollo y pruebas, facilitando la validación de las funcionalidades de la API.



### Características de los Schemas ###

## artistSchema
El esquema de artistas incluye lo siguiente:
•	name (String, requerido): El nombre del artista, único y sin espacios innecesarios.
•	image (String, opcional): Una URL de la imagen asociada al artista.
•	paintings (Array de ObjectId, opcional): Referencias a las obras de arte asociadas al artista.
•	movement (Array de Strings, requerido): El movimiento artístico al que pertenece el artista, restringido a un conjunto específico de valores.
•	nationality (String, requerido): Nacionalidad del artista.

## paintingSchema
El esquema de pinturas incluye lo siguiente:
•	title (String, requerido): El título de la pintura, único y sin espacios innecesarios.
•	artist (ObjectId, requerido): Referencia al artista que creó la pintura.
•	image (String, requerido): Una URL de la imagen de la pintura.
•	movement (Array de Strings, requerido): El movimiento artístico al que pertenece la pintura, con los mismos valores permitidos que el esquema de artistas.

## userSchema
El esquema de usuarios incluye lo siguiente:
•	email (String, requerido): Dirección de correo electrónico única del usuario, con formato válido.
•	password (String, requerido): Contraseña del usuario, almacenada de forma segura.
•	name (String, requerido): Nombre del usuario.
•	role (String, requerido): Rol del usuario, con valores restringidos:
o	admin: Usuario con privilegios de administrador.
o	user: Usuario estándar.
•	favorites (Array de ObjectId, opcional): Lista de obras de arte marcadas como favoritas por el usuario.


### Funcionalidades principales ###

## Cuadros (Paintings)
• Los usuarios pueden explorar todas las obras de arte disponibles.
• Los usuarios registrados pueden sugerir nuevas obras de arte.
• Las obras deben ser verificadas por un administrador antes de ser públicas.
• Cada obra de arte es única en combinación de título y pintor.

## Artistas (Artists)
• Los usuarios pueden explorar información sobre los pintores.
• Los usuarios registrados pueden sugerir nuevos pintores.
• Los administradores tienen la capacidad de editar o eliminar pintores.

## Usuarios (Users)
•	Existen dos tipos de usuarios: admin y user.
•	Por defecto, al registrarse, un usuario se le asigna automáticamente el rol de user.
•	El primer administrador (admin) debe configurarse manualmente.



### Requisitos ###
• Node.js v16
• MongoDB 
• Cloudinary



### Instalación ###
1.	Clona este repositorio:
bash
Copiar código
git clone <URL_DEL_REPOSITORIO>  
2.	Instala las dependencias:
bash
Copiar código
npm install  
3.	Configura las variables de entorno: Crea un archivo .env con los siguientes valores:
env
Copiar código
PORT=3000  
MONGO_URI=<TU_CONEXIÓN_A_MONGO_DB>  
JWT_SECRET=<TU_SECRETO_JWT>  
4.	Inicia el servidor:
bash
Copiar código
npm start


### Endpoints ###

## Usuarios (Users)

| Método  | Endpoint                         | Descripción                                       | Autenticación       |
|---------|----------------------------------|---------------------------------------------------|---------------------|
| `POST`  | `/users/register`                | Registro de usuario.                              | No                  |
| `POST`  | `/users/login`                   | Inicio de sesión.                                 | No                  |
| `GET`   | `/users/:id/favorites`           | Muestra los favoritos de un usuario.              | Auth + Propio       |
| `POST`  | `/users/:id/favorites`           | Agrega un cuadro a los favoritos de un usuario.   | Auth + Propio       |
| `DELETE`| `/users/:id/favorites`           | Elimina un cuadro de los favoritos de un usuario. | Auth + Propio       |
| `GET`   | `/users/`                        | Lista todos los usuarios.                         | Admin               |
| `PUT`   | `/users/change-user/:id`         | Cambia el rol de un usuario.                      | Admin               |
| `DELETE`| `/users/:id`                     | Elimina un usuario.                               | Auth + Propio/Admin |

## Obras de Arte (Paintings)

| Método  | Endpoint                        | Descripción                                        | Autenticación       |
|---------|---------------------------------|----------------------------------------------------|---------------------|
| `GET`   | `/paintings/`                   | Lista todas las obras de arte verificadas.         | No                  |
| `GET`   | `/paintings/not-verified`       | Lista obras pendientes de verificación.            | Admin               |
| `GET`   | `/paintings/:id`                | Muestra detalles de una obra por ID.               | No                  |
| `GET`   | `/paintings/title/:title`       | Busca obras por título.                            | No                  |
| `GET`   | `/paintings/artist/:name`       | Busca obras por pintor.                            | No                  |
| `POST`  | `/paintings/`                   | Crea una nueva obra de arte.                       | Auth                |
| `PUT`   | `/paintings/:id`                | Edita una obra de arte.                            | Auth + Propio/Admin |
| `DELETE`| `/paintings/:id`                | Elimina una obra de arte.                          | Auth + Propio/Admin |

## Pintores (Artists)

| Método  | Endpoint                        | Descripción                                        | Autenticación       |
|---------|---------------------------------|----------------------------------------------------|---------------------|
| `GET`   | `/artists/`                     | Lista todos los pintores.                          | No                  |
| `GET`   | `/artists/:id`                  | Muestra detalles de un pintor por ID.              | No                  |
| `POST`  | `/artists/`                     | Crea un nuevo pintor.                              | Auth                |
| `PUT`   | `/artists/:id`                  | Edita la información de un pintor.                 | Auth + Propio/Admin |
| `DELETE`| `/artists/:id`                  | Elimina un pintor.                                 | Auth + Propio/Admin |


### Roles y Permisos ###

## Usuario (user)
•	Explorar obras de arte y pintores disponibles en la aplicación.
•	Añadir obras de arte a su lista de favoritos.
•	Eliminar obras de arte de su lista de favoritos.

## Administrador (admin)
•	Crear y editar obras de arte y pintores.
•	Eliminar cualquier contenido, incluyendo obras de arte, pintores y usuarios.
•	Modificar los roles asignados a los usuarios.



### Tecnologías utilizadas ###
• Node.js
• Express.js
• MongoDB
• Mongoose
• JWT para autenticación
