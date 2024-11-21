<p align="left">
  <a href="https://industriascts.com/" target="blank"><img src="https://industriascts.com/wp-content/uploads/2024/01/Logo-CTS_header.png" width="300" alt="CTS logo" /></a>
</p>

## 🎉 Bienvenido a la documentación de QR Cloud 🎉

En este repositorio encontrarás el código fuente de la API web de QR Cloud, una aplicación de gestión de proyectos para la empresa INDUSTRIAS CTS. Para que puedas empezar a trabajar con la API lo antes posible, te explicamos cómo instalar Docker y ejecutar la aplicación en este documento. 📚

## Índice

1. [Estructura del proyecto](#estructura-del-proyecto)
2. [Instalación de Docker](#instalación-de-docker)
3. [Ejecución de la API](#ejecución-de-la-api)
   - [Configuración del archivo .env](#configuración-del-archivo-env)
   - [Base de datos de desarrollo](#base-de-datos-de-desarrollo)
   - [Ejecutar Docker Compose](#ejecutar-docker-compose)
   - [Ejecutar script de migraciones](#ejecutar-script-de-migraciones)

## Estructura del proyecto

```bash
cloud-back/
├── init-scripts/
│   ├── cts_cloud.sql
│   └── grant_privileges.sql
├── src/
│   ├── auth
│   ├── common
│   ├── config
│   ├── credential
│   ├── database
│   ├── profile
│   ├── roles
│   ├── users
│   ├── app.modle.ts
│   ├── app.controller.ts
│   └── main.ts
│   
├── test/
├── .dockerignore
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

## Instalación de Docker

Para instalar Docker, sigue las instrucciones oficiales de instalación para tu sistema operativo en el sitio web de Docker. 🌐

## Ejecución de la API

### Configuración del archivo .env

* Haz clic en el botón "Descargar" en el archivo `.env.example` y renombra el archivo descargado a `.env` en la carpeta raíz del proyecto.
* Configura las variables de entorno suministradas por el líder de proyecto. 🔑

### Base de datos de desarrollo

* Haz clic en el botón "Descargar" en el archivo `qr_cloud.sql` y copia el archivo en la carpeta `init-scripts`.
* Renombra el archivo a `qr_cloud.sql`. 📂

### Ejecutar Docker Compose

* Ejecuta el comando `docker-compose up --build -d` en la carpeta raíz del proyecto. 🚀

### Ejecutar script de migraciones

* Ejecuta el comando `npm run migration:run` en la carpeta raíz del proyecto. 📈

¡Listo! Ahora deberías poder acceder a la API en <http://localhost:8000/api>. Si tienes alguna pregunta o necesitas ayuda, no dudes en preguntar en el canal de Teams de la empresa. 💬

