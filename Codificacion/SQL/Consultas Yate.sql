use parqueadero_bd;

SELECT id_historial FROM historial;

-- Ver reservas con usuario y vehículo
SELECT 
    u.primer_nombre,
    u.primer_apellido,
    v.placa,
    r.fecha_inicio,
    r.fecha_fin
FROM reserva r
JOIN usuario u ON r.id_usuario = u.id_usuario
JOIN vehiculo v ON r.id_vehiculo = v.id_vehiculo;

-- Historial completo (con acción)
SELECT 
    ta.nombre AS accion,
    h.descripcion,
    h.fecha
FROM historial h
JOIN tipo_accion ta 
ON h.id_tipo_accion = ta.id_tipo_accion;

-- Usuario con más reservas
SELECT primer_nombre, primer_apellido
FROM usuario
WHERE id_usuario = (
    SELECT id_usuario
    FROM reserva
    GROUP BY id_usuario
    ORDER BY COUNT(*) DESC
    LIMIT 1
);

-- Vehículos que tienen reservas
SELECT placa
FROM vehiculo
WHERE id_vehiculo IN (
    SELECT id_vehiculo FROM reserva
);

-- Vehículos actualmente dentro (no han salido)
SELECT v.placa, r.entrada
FROM registro r
JOIN reserva res ON r.id_reserva = res.id_reserva
JOIN vehiculo v ON res.id_vehiculo = v.id_vehiculo
WHERE r.salida IS NULL;

-- Cantidad de reservas por usuario
SELECT 
    u.primer_nombre,
    COUNT(r.id_reserva) AS total_reservas
FROM usuario u
LEFT JOIN reserva r ON u.id_usuario = r.id_usuario
GROUP BY u.id_usuario;

-- Parqueaderos más usados
SELECT 
    p.zona,
    p.numero,
    COUNT(r.id_reserva) AS uso_total
FROM parqueadero p
JOIN reserva r ON p.id_parqueadero = r.id_parqueadero
GROUP BY p.id_parqueadero
ORDER BY uso_total DESC;