USE parqueadero_bd;

-- JOINS
-- Ver vehículos con su propietario
SELECT 
    v.placa,
    v.marca,
    v.color,
    u.primer_nombre,
    u.primer_apellido
FROM vehiculo v
JOIN usuario u 
    ON v.id_usuario = u.id_usuario;


-- Ver parqueaderos con su estado
SELECT 
    p.zona,
    p.numero,
    ep.nombre AS estado
FROM parqueadero p
JOIN estado_parqueadero ep 
    ON p.id_estado_parqueadero = ep.id_estado_parqueadero;


-- Ver reservas con usuario y vehículo
SELECT 
    r.id_reserva,
    u.primer_nombre,
    v.placa,
    r.fecha_inicio,
    r.fecha_fin
FROM reserva r
JOIN usuario u ON r.id_usuario = u.id_usuario
JOIN vehiculo v ON r.id_vehiculo = v.id_vehiculo;


-- CONSULTAS
-- Contar vehículos por tipo
SELECT 
    tv.nombre,
    COUNT(*) AS cantidad
FROM vehiculo v
JOIN tipo_vehiculo tv 
    ON v.id_tipo_vehiculo = tv.id_tipo_vehiculo
GROUP BY tv.nombre;


-- Usuarios activos
SELECT *
FROM usuario u
JOIN estado_usuario eu 
    ON u.id_estado = eu.id_estado
WHERE eu.nombre = 'Activo';
-- 

-- Parqueaderos disponibles
SELECT *
FROM parqueadero p
JOIN estado_parqueadero ep 
    ON p.id_estado_parqueadero = ep.id_estado_parqueadero
WHERE ep.nombre = 'Disponible';


-- SUBCONSULTAS
-- Usuarios con reservas activas
SELECT primer_nombre, primer_apellido
FROM usuario
WHERE id_usuario IN (
    SELECT id_usuario
    FROM reserva
    WHERE NOW() BETWEEN fecha_inicio AND fecha_fin
);


-- Vehículos en parqueadero ahora
SELECT placa
FROM vehiculo
WHERE id_vehiculo IN (
    SELECT r.id_vehiculo
    FROM reserva r
    JOIN registro reg ON r.id_reserva = reg.id_reserva
    WHERE reg.salida IS NULL
);


-- Parqueaderos ocupados
SELECT zona, numero
FROM parqueadero
WHERE id_parqueadero IN (
    SELECT id_parqueadero
    FROM reserva
);


-- 