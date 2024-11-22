# Etapa 1: Construcción del frontend
FROM node:16 AS frontend-build

# Establecer el directorio de trabajo para el frontend
WORKDIR /app

# Copiar el archivo package.json y package-lock.json del frontend
COPY ./package.json ./package-lock.json ./

# Instalar las dependencias necesarias del frontend
RUN npm install

# Copiar el código fuente del frontend al contenedor
COPY ./ ./

# Construir el frontend para producción
RUN npm run build

# Etapa 2: Configuración del backend
FROM node:16 AS backend

# Establecer el directorio de trabajo para el backend
WORKDIR /server

# Copiar el código fuente del backend
COPY ./back /server

# Instalar las dependencias del backend
RUN npm install

# Copiar los archivos del frontend construido desde la etapa anterior al backend
COPY --from=frontend-build /app/build /server/public

# Exponer el puerto del backend
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server.js"]
