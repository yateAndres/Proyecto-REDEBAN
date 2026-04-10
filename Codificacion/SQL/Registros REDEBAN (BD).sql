USE parqueadero_bd;
-- ROL
INSERT INTO rol (nombre) VALUES
('Administrador'),
('Guardia'),
('Usuario'),
('Supervisor'),
('Invitado'),
('Operador'),
('Cliente'),
('Técnico'),
('Seguridad'),
('Gerente');

-- ESTADO USUARIO
INSERT INTO estado_usuario (nombre) VALUES
('Activo'),
('Inactivo'),
('Suspendido'),
('Bloqueado'),
('Pendiente'),
('Eliminado'),
('Verificado'),
('No verificado'),
('En revisión'),
('Aprobado');

-- USUARIO
INSERT INTO usuario (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, documento, telefono, email, password, id_rol, id_estado) VALUES
('Juan','Carlos','Perez','Lopez','1001','300000001','juan1@mail.com','123',1,1),
('Maria','Luisa','Gomez','Diaz','1002','300000002','maria2@mail.com','123',2,1),
('Pedro','Jose','Ramirez','Torres','1003','300000003','pedro3@mail.com','123',3,1),
('Ana','Sofia','Martinez','Ruiz','1004','300000004','ana4@mail.com','123',1,2),
('Luis','Fernando','Castro','Vega','1005','300000005','luis5@mail.com','123',2,1),
('Laura','Paola','Moreno','Rios','1006','300000006','laura6@mail.com','123',3,1),
('Carlos','Andres','Jimenez','Mora','1007','300000007','carlos7@mail.com','123',1,1),
('Diana','Carolina','Ortiz','Silva','1008','300000008','diana8@mail.com','123',2,1),
('Jorge','Ivan','Herrera','Navas','1009','300000009','jorge9@mail.com','123',3,1),
('Camila','Andrea','Suarez','Paz','1010','300000010','camila10@mail.com','123',1,1);

-- TIPO VEHICULO
INSERT INTO tipo_vehiculo (nombre) VALUES
('Carro'),
('Moto'),
('Bicicleta'),
('Camión'),
('Bus'),
('Van'),
('Scooter'),
('Taxi'),
('Camioneta'),
('Tractor');

-- VEHICULO
INSERT INTO vehiculo (placa, id_tipo_vehiculo, marca, color, id_usuario) VALUES
('AAA111',1,'Toyota','Rojo',1),
('BBB222',2,'Yamaha','Azul',2),
('CCC333',1,'Chevrolet','Negro',3),
('DDD444',2,'Honda','Blanco',4),
('EEE555',1,'Mazda','Gris',5),
('FFF666',2,'Suzuki','Rojo',6),
('GGG777',1,'Kia','Azul',7),
('HHH888',2,'AKT','Negro',8),
('III999',1,'Renault','Blanco',9),
('JJJ000',2,'Bajaj','Gris',10);

-- ESTADO PARQUEADERO
INSERT INTO estado_parqueadero (nombre) VALUES
('Disponible'),
('Ocupado'),
('Reservado'),
('Mantenimiento'),
('Fuera de servicio'),
('Limpieza'),
('Bloqueado'),
('En revisión'),
('Temporal'),
('Asignado');

-- PARQUEADERO
INSERT INTO parqueadero (zona, numero, id_estado_parqueadero, id_tipo_vehiculo) VALUES
('A',1,1,1),
('A',2,1,2),
('B',1,2,1),
('B',2,1,2),
('C',1,3,1),
('C',2,1,2),
('D',1,1,1),
('D',2,2,2),
('E',1,1,1),
('E',2,1,2);

-- ESTADO RESERVA
INSERT INTO estado_reserva (nombre) VALUES
('Activa'),
('Finalizada'),
('Cancelada'),
('Pendiente'),
('Expirada'),
('En uso'),
('Reservada'),
('Confirmada'),
('Rechazada'),
('En proceso');

-- RESERVA
INSERT INTO reserva (fecha_inicio, fecha_fin, id_estado_reserva, id_usuario, id_vehiculo, id_parqueadero) VALUES
(NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR),1,1,1,1),
(NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR),1,2,2,2),
(NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR),2,3,3,3),
(NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR),1,4,4,4),
(NOW(), DATE_ADD(NOW(), INTERVAL 5 HOUR),1,5,5,5),
(NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR),3,6,6,6),
(NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR),1,7,7,7),
(NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR),1,8,8,8),
(NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR),2,9,9,9),
(NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR),1,10,10,10);

-- REGISTRO
INSERT INTO registro (entrada, salida, id_reserva, id_usuario_registra) VALUES
(NOW(), NULL,1,2),
(NOW(), NULL,2,2),
(NOW(), NOW(),3,1),
(NOW(), NULL,4,2),
(NOW(), NULL,5,1),
(NOW(), NOW(),6,2),
(NOW(), NULL,7,1),
(NOW(), NULL,8,2),
(NOW(), NOW(),9,1),
(NOW(), NULL,10,2);

-- TIPO ACCION
INSERT INTO tipo_accion (nombre) VALUES
('Ingreso'),
('Salida'),
('Reserva'),
('Cancelación'),
('Modificación'),
('Pago'),
('Validación'),
('Bloqueo'),
('Desbloqueo'),
('Auditoría');

-- HISTORIAL
INSERT INTO historial (id_tipo_accion, descripcion, fecha, id_registro) VALUES
(1,'Ingreso de vehículo',NOW(),1),
(2,'Salida de vehículo',NOW(),2),
(3,'Reserva creada',NOW(),3),
(4,'Reserva cancelada',NOW(),4),
(5,'Modificación de reserva',NOW(),5),
(6,'Pago realizado',NOW(),6),
(7,'Validación correcta',NOW(),7),
(8,'Bloqueo temporal',NOW(),8),
(9,'Desbloqueo realizado',NOW(),9),
(10,'Auditoría completada',NOW(),10);

-- TIPO REPORTE
INSERT INTO tipo_reporte (nombre) VALUES
('Incidente'),
('Daño'),
('Queja'),
('Sugerencia'),
('Mantenimiento'),
('Seguridad'),
('Accidente'),
('Robo'),
('Falla técnica'),
('Otro');

-- REPORTE
INSERT INTO reporte (id_tipo_reporte, descripcion, fecha, observaciones, id_historial) VALUES
(1,'Incidente leve',NOW(),'Sin novedades',1),
(2,'Daño en estructura',NOW(),'Requiere revisión',2),
(3,'Queja usuario',NOW(),'Tiempo de espera alto',3),
(4,'Sugerencia mejora',NOW(),'Agregar señalización',4),
(5,'Mantenimiento requerido',NOW(),'Zona A',5),
(6,'Problema de seguridad',NOW(),'Acceso no autorizado',6),
(7,'Accidente menor',NOW(),'Sin heridos',7),
(8,'Intento de robo',NOW(),'Controlado',8),
(9,'Falla técnica',NOW(),'Sistema caído',9),
(10,'Otro caso',NOW(),'Sin detalles',10);