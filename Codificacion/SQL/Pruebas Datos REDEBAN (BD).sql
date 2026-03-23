use parqueadero_bd;

-- ROL
INSERT INTO rol VALUES 
(1, 'Administrador'),
(2, 'Empleado'),
(3, 'Cliente');

-- ESTADO USUARIO
INSERT INTO estado_usuario VALUES
(1, 'Activo'),
(2, 'Inactivo');

-- TIPO VEHICULO
INSERT INTO tipo_vehiculo VALUES
(1, 'Carro'),
(2, 'Moto'),
(3, 'Bicicleta');

-- ESTADO PARQUEADERO
INSERT INTO estado_parqueadero VALUES
(1, 'Disponible'),
(2, 'Ocupado'),
(3, 'Reservado');

-- ESTADO RESERVA
INSERT INTO estado_reserva VALUES
(1, 'Activa'),
(2, 'Cancelada'),
(3, 'Finalizada');

-- TIPO ACCION
INSERT INTO tipo_accion VALUES
(1, 'Ingreso'),
(2, 'Salida'),
(3, 'Modificación');

-- TIPO REPORTE
INSERT INTO tipo_reporte VALUES
(1, 'Incidente'),
(2, 'Daño'),
(3, 'Mantenimiento');

-- USUARIO
INSERT INTO usuario VALUES
(1, 'Juan', 'Carlos', 'Perez', 'Lopez', '123456789', '3001234567', 'juan@test.com', 1, 1),
(2, 'Ana', 'Maria', 'Gomez', 'Diaz', '987654321', '3009876543', 'ana@test.com', 2, 1),
(3, 'Luis', NULL, 'Martinez', 'Rojas', '456123789', '3015556666', 'luis@test.com', 3, 1);

-- VEHICULO
INSERT INTO vehiculo VALUES
(1, 'ABC123', 1, 'Toyota', 'Rojo', 3),
(2, 'XYZ789', 2, 'Yamaha', 'Negro', 3);

-- PARQUEADERO
INSERT INTO parqueadero VALUES
(1, 'A', 1, 1, 1),
(2, 'A', 2, 1, 2),
(3, 'B', 1, 2, 1);

-- RESERVA
INSERT INTO reserva VALUES
(1, '2026-03-23', '08:00:00', 1, 3, 1, 1),
(2, '2026-03-23', '09:00:00', 1, 3, 2, 2);

-- REGISTRO
INSERT INTO registro VALUES
(1, '08:05:00', '10:00:00', 1, 2),
(2, '09:10:00', NULL, 2, 2);

-- HISTORIAL
INSERT INTO historial VALUES
(1, 1, 'Ingreso de vehículo correcto', '2026-03-23 08:05:00', 1),
(2, 2, 'Salida de vehículo', '2026-03-23 10:00:00', 1),
(3, 1, 'Ingreso en proceso', '2026-03-23 09:10:00', 2);

-- REPORTE
INSERT INTO reporte VALUES
(1, 1, 'Rasguño en puerta', '2026-03-23 10:05:00', 'Cliente notificado', 2),
(2, 3, 'Revisión de espacio', '2026-03-23 09:30:00', 'Sin novedades', 3);

SELECT * FROM usuario;
SELECT * FROM reserva;
SELECT * FROM registro;