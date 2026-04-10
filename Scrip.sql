CREATE DATABASE parqueadero_bd;
USE parqueadero_bd;

-- TABLA ROL
CREATE TABLE rol (
    id_rol INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA ESTADO USUARIO
CREATE TABLE estado_usuario (
    id_estado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA USUARIO
CREATE TABLE usuario (
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    documento VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_estado) REFERENCES estado_usuario(id_estado)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
);

-- TABLA TIPO VEHICULO
CREATE TABLE tipo_vehiculo (
    id_tipo_vehiculo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA VEHICULO
CREATE TABLE vehiculo (
    id_vehiculo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) NOT NULL UNIQUE,
    id_tipo_vehiculo INT NOT NULL,
    marca VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_vehiculo)
	ON DELETE RESTRICT 
    ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE RESTRICT 
	ON UPDATE CASCADE
);

-- TABLA ESTADO PARQUEADERO
CREATE TABLE estado_parqueadero (
    id_estado_parqueadero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA PARQUEADERO
CREATE TABLE parqueadero (
    id_parqueadero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    zona VARCHAR(10) NOT NULL,
	numero INT NOT NULL,
	UNIQUE (zona, numero),
    id_estado_parqueadero INT NOT NULL,
    id_tipo_vehiculo INT NOT NULL,
    FOREIGN KEY (id_estado_parqueadero) REFERENCES estado_parqueadero(id_estado_parqueadero)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_vehiculo)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
);

-- TABLA ESTADO RESERVA
CREATE TABLE estado_reserva (
    id_estado_reserva INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA RESERVA
CREATE TABLE reserva (
    id_reserva INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    id_estado_reserva INT NOT NULL,
    id_usuario INT NOT NULL,
    id_vehiculo INT NOT NULL,
    id_parqueadero INT NOT NULL,
    FOREIGN KEY (id_estado_reserva) REFERENCES estado_reserva(id_estado_reserva)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_parqueadero) REFERENCES parqueadero(id_parqueadero)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
);

-- TABLA REGISTRO
CREATE TABLE registro (
    id_registro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    entrada DATETIME NOT NULL,
    salida DATETIME,
    id_reserva INT NOT NULL,
    id_usuario_registra INT NOT NULL,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario_registra) REFERENCES usuario(id_usuario)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
);

-- TABLA TIPO ACCION
CREATE TABLE tipo_accion (
    id_tipo_accion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA HISTORIAL
CREATE TABLE historial (
    id_historial INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_tipo_accion INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    id_registro INT NOT NULL,
    FOREIGN KEY (id_tipo_accion) REFERENCES tipo_accion(id_tipo_accion)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_registro) REFERENCES registro(id_registro)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
);

-- TABLA TIPO REPORTE
CREATE TABLE tipo_reporte (
    id_tipo_reporte INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA REPORTE
CREATE TABLE reporte (
    id_reporte INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_tipo_reporte INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    observaciones VARCHAR(255) NOT NULL,
    id_historial INT NOT NULL,
    FOREIGN KEY (id_tipo_reporte) REFERENCES tipo_reporte(id_tipo_reporte)
    ON DELETE RESTRICT
	ON UPDATE CASCADE,
    FOREIGN KEY (id_historial) REFERENCES historial(id_historial)
    ON DELETE RESTRICT
	ON UPDATE CASCADE
);