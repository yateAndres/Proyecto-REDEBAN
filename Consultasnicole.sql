use parqueadero_bd;

/**consultas*/
SELECT zona, numero 
FROM parqueadero 
WHERE id_estado_parqueadero = 1; 


/*subconsultas*/
SELECT placa, marca, color
FROM vehiculo
WHERE id_vehiculo IN (
    SELECT id_vehiculo 
    FROM reserva 
    WHERE id_estado_reserva = 1
);

/*joins*/
SELECT 
    u.primer_nombre, 
    u.primer_apellido, 
    COUNT(v.id_vehiculo) AS total_vehiculos
FROM usuario u
LEFT JOIN vehiculo v ON u.id_usuario = v.id_usuario
GROUP BY u.id_usuario;

SELECT 
    CONCAT(u.primer_nombre, ' ', u.primer_apellido) AS cliente,
    v.placa,
    r.fecha_inicio,
    r.fecha_fin
FROM reserva r
INNER JOIN usuario u ON r.id_usuario = u.id_usuario
INNER JOIN vehiculo v ON r.id_vehiculo = v.id_vehiculo
WHERE DATE(r.fecha_inicio) = CURDATE();

