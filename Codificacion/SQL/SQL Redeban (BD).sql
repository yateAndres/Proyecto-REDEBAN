CREATE DATABASE parqueadero_bd;
USE parqueadero_bd;

-- TABLA ROL
CREATE TABLE rol (
    id_rol INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA ESTADO USUARIO
CREATE TABLE estado_usuario (
    id_estado INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA USUARIO
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY,
    primer_nombre VARCHAR(50),
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50),
    segundo_apellido VARCHAR(50),
    documento VARCHAR(20),
    telefono VARCHAR(20),
    email VARCHAR(100),
    id_rol INT,
    id_estado INT,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY (id_estado) REFERENCES estado_usuario(id_estado)
);

-- TABLA TIPO VEHICULO
CREATE TABLE tipo_vehiculo (
    id_tipo_vehiculo INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- TABLA VEHICULO
CREATE TABLE vehiculo (
    id_vehiculo INT PRIMARY KEY,
    placa VARCHAR(10),
    id_tipo_vehiculo INT,
    marca VARCHAR(50),
    color VARCHAR(50),
    id_usuario INT,
    FOREIGN KEY (id_tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_vehiculo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- TABLA ESTADO PARQUEADERO
CREATE TABLE estado_parqueadero (
    id_estado_parqueadero INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- TABLA PARQUEADERO
CREATE TABLE parqueadero (
    id_parqueadero INT PRIMARY KEY,
    zona VARCHAR(10),
    numero INT,
    id_estado_parqueadero INT,
    id_tipo_vehiculo INT,
    FOREIGN KEY (id_estado_parqueadero) REFERENCES estado_parqueadero(id_estado_parqueadero),
    FOREIGN KEY (id_tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_vehiculo)
);

-- TABLA ESTADO RESERVA
CREATE TABLE estado_reserva (
    id_estado_reserva INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- TABLA RESERVA
CREATE TABLE reserva (
    id_reserva INT PRIMARY KEY,
    fecha DATE,
    hora_inicio TIME,
    id_estado_reserva INT,
    id_usuario INT,
    id_vehiculo INT,
    id_parqueadero INT,
    FOREIGN KEY (id_estado_reserva) REFERENCES estado_reserva(id_estado_reserva),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo),
    FOREIGN KEY (id_parqueadero) REFERENCES parqueadero(id_parqueadero)
);

-- TABLA REGISTRO
CREATE TABLE registro (
    id_registro INT PRIMARY KEY,
    entrada TIME,
    salida TIME,
    id_reserva INT,
    id_usuario_registra INT,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
    FOREIGN KEY (id_usuario_registra) REFERENCES usuario(id_usuario)
);

-- TABLA TIPO ACCION
CREATE TABLE tipo_accion (
    id_tipo_accion INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- TABLA HISTORIAL
CREATE TABLE historial (
    id_historial INT PRIMARY KEY,
    id_tipo_accion INT,
    descripcion VARCHAR(255),
    fecha DATETIME,
    id_registro INT,
    FOREIGN KEY (id_tipo_accion) REFERENCES tipo_accion(id_tipo_accion),
    FOREIGN KEY (id_registro) REFERENCES registro(id_registro)
);

-- TABLA TIPO REPORTE
CREATE TABLE tipo_reporte (
    id_tipo_reporte INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- TABLA REPORTE
CREATE TABLE reporte (
    id_reporte INT PRIMARY KEY,
    id_tipo_reporte INT,
    descripcion VARCHAR(255),
    fecha DATETIME,
    observaciones VARCHAR(255),
    id_historial INT,
    FOREIGN KEY (id_tipo_reporte) REFERENCES tipo_reporte(id_tipo_reporte),
    FOREIGN KEY (id_historial) REFERENCES historial(id_historial)
);