use parqueadero_bd;

INSERT INTO rol (nombre) VALUES
('Administrador'),
('Operador'),
('Cliente');

INSERT INTO estado_usuario (nombre) VALUES
('Activo'),
('Inactivo');

INSERT INTO usuario 
(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, documento, telefono, email, id_rol, id_estado) VALUES
('Juan', 'Carlos', 'Perez', 'Lopez', '1001', '3001234567', 'juan@mail.com', 3, 1),
('Maria', 'Luisa', 'Gomez', 'Diaz', '1002', '3007654321', 'maria@mail.com', 3, 1),
('Admin', NULL, 'Sistema', NULL, '9999', '3000000000', 'admin@mail.com', 1, 1),
('Pedro', NULL, 'Ruiz', NULL, '1003', '3011111111', 'pedro@mail.com', 2, 1);

INSERT INTO tipo_vehiculo (nombre) VALUES
('Carro'),
('Moto');

INSERT INTO vehiculo (placa, id_tipo_vehiculo, marca, color, id_usuario) VALUES
('ABC123', 1, 'Toyota', 'Rojo', 1),
('XYZ789', 1, 'Chevrolet', 'Negro', 2),
('MTR456', 2, 'Yamaha', 'Azul', 1),
('JKL321', 1, 'Mazda', 'Blanco', 4);

INSERT INTO estado_parqueadero (nombre) VALUES
('Disponible'),
('Ocupado');

INSERT INTO parqueadero (zona, numero, id_estado_parqueadero, id_tipo_vehiculo) VALUES
('A', 1, 1, 1),
('A', 2, 1, 1),
('B', 1, 1, 2),
('B', 2, 1, 2);

INSERT INTO estado_reserva (nombre) VALUES
('Activa'),
('Finalizada'),
('Cancelada');

INSERT INTO reserva (fecha_inicio, fecha_fin, id_estado_reserva, id_usuario, id_vehiculo, id_parqueadero) VALUES
('2026-03-28 00:00:00', '2026-03-28 08:00:00', 1, 1, 1, 1),
('2026-03-28 00:00:00', '2026-03-28 09:00:00', 2, 2, 2, 2),
('2026-03-28 00:00:00', '2026-03-28 10:00:00', 1, 1, 3, 3),
('2026-03-28 00:00:00', '2026-03-28 11:00:00', 3, 4, 4, 1);

SELECT * FROM reserva;

INSERT INTO registro (entrada, salida, id_reserva, id_usuario_registra) VALUES
('2026-03-28 08:00:00', '2026-03-28 10:00:00', 1, 3),
('2026-03-28 09:00:00', '2026-03-28 11:00:00', 2, 3),
('2026-03-28 10:00:00', NULL, 3, 4);

SELECT * FROM registro;

INSERT INTO tipo_accion (nombre) VALUES
('Ingreso'),
('Salida'),
('Cancelación');

INSERT INTO historial (id_tipo_accion, descripcion, fecha, id_registro) VALUES
(1, 'Ingreso vehiculo ABC123', '2026-03-28 08:00:00', 7),
(2, 'Salida vehiculo ABC123', '2026-03-28 10:00:00', 8),
(1, 'Ingreso vehiculo XYZ789', '2026-03-28 09:00:00', 9);

INSERT INTO tipo_reporte (nombre) VALUES
('Incidente'),
('Mantenimiento');

INSERT INTO reporte (id_tipo_reporte, descripcion, fecha, observaciones, id_historial) VALUES
(1, 'Golpe leve en parqueadero', '2026-03-28 09:30:00', 'Sin daños graves', 18),
(2, 'Revisión de cámaras', '2026-03-28 07:00:00', 'Todo en orden', 16);

SELECT id_historial FROM historial;

