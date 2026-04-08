-- Registro de Ingreso 

-- Simulando que el usuario con ID 1 llega con su vehículo a su reserva
INSERT INTO registro (entrada, salida, id_reserva, id_usuario_registra)
VALUES (NOW(), NULL, 1, 3); -- El usuario 3 (Admin/Operador) realiza el registro

-- Actualizamos el estado del parqueadero a 'Ocupado' (ID 2)
UPDATE parqueadero 
SET id_estado_parqueadero = 2 
WHERE id_parqueadero = (SELECT id_parqueadero FROM reserva WHERE id_reserva = 1);

-- Creamos la huella en el historial
INSERT INTO historial (id_tipo_accion, descripcion, fecha, id_registro)
VALUES (1, 'Ingreso autorizado de vehículo placa ABC123', NOW(), LAST_INSERT_ID());


-- Procesamiento de Salida y entrada


-- PROCESAR SALIDA
UPDATE registro 
SET salida = NOW() 
WHERE id_reserva = 1 AND salida IS NULL;

-- Liberar el parqueadero asociado a esa reserva (Poner en 'Disponible' = 1)
UPDATE parqueadero p
JOIN reserva r ON p.id_parqueadero = r.id_parqueadero
SET p.id_estado_parqueadero = 1
WHERE r.id_reserva = 1;

-- Registrar la acción en el historial
INSERT INTO historial (id_tipo_accion, descripcion, fecha, id_registro)
SELECT 2, 'Salida procesada correctamente', NOW(), id_registro 
FROM registro WHERE id_reserva = 1;


-- Gestión cada lugar en el que el correo se parqueo (celdas)


-- Consultar disponibilidad de celdas por zona y qué tipo de vehículo admiten
SELECT 
    p.zona, 
    p.numero AS celda, 
    tp.nombre AS apto_para, 
    ep.nombre AS estado_actual
FROM parqueadero p
JOIN tipo_vehiculo tp ON p.id_tipo_vehiculo = tp.id_tipo_vehiculo
JOIN estado_parqueadero ep ON p.id_estado_parqueadero = ep.id_estado_parqueadero
ORDER BY p.zona, p.numero;

-- Cambiar una celda a mantenimiento
-- UPDATE parqueadero SET id_estado_parqueadero = 3 WHERE zona = 'A' AND numero = 5;


-- Gestión de Usuarios


-- Ver todos los usuarios con su rol y estado actual
SELECT 
    u.documento, 
    CONCAT(u.primer_nombre, ' ', u.primer_apellido) AS nombre_completo, 
    r.nombre AS rol, 
    eu.nombre AS estado
FROM usuario u
JOIN rol r ON u.id_rol = r.id_rol
JOIN estado_usuario eu ON u.id_estado = eu.id_estado;

-- Desactivar un usuario (Borrado lógico para mantener integridad)
UPDATE usuario SET id_estado = 2 WHERE documento = '1001';


-- Auditoría y Reportes 


SELECT 
    rep.fecha, 
    tr.nombre AS tipo_incidente, 
    rep.descripcion, 
    h.descripcion AS accion_relacionada,
    u.primer_nombre AS registrado_por
FROM reporte rep
JOIN tipo_reporte tr ON rep.id_tipo_reporte = tr.id_tipo_reporte
JOIN historial h ON rep.id_historial = h.id_historial
JOIN registro reg ON h.id_registro = reg.id_registro
JOIN usuario u ON reg.id_usuario_registra = u.id_usuario;



-- Subconsulta: Vehículos que más tiempo han permanecido

SELECT v.placa, v.marca, 
       TIMEDIFF(r.salida, r.entrada) AS tiempo_total
FROM vehiculo v
JOIN reserva res ON v.id_vehiculo = res.id_vehiculo
JOIN registro r ON res.id_reserva = r.id_reserva
WHERE r.salida IS NOT NULL
ORDER BY tiempo_total DESC;
