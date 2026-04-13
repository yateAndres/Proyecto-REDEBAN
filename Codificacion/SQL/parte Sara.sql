USE parqueadero_bd;

-- 1. ACTUALIZAR ROL DE UN USUARIO
UPDATE usuario
SET id_rol = (
    SELECT id_rol 
    FROM rol 
    WHERE nombre = 'Guardia'
)
WHERE id_usuario = 1;

select * from usuario;
select * from rol;

--  2. PORCENTAJE DE OCUPACIÓN POR ZONA
SELECT 
    p.zona,
    COUNT(*) * 100.0 / (
        SELECT COUNT(*) 
        FROM parqueadero p2 
        WHERE p2.zona = p.zona
    ) AS porcentaje_ocupacion
FROM parqueadero p
WHERE id_estado_parqueadero = (
    SELECT id_estado_parqueadero 
    FROM estado_parqueadero 
    WHERE nombre = 'Ocupado'
)
GROUP BY p.zona;


-- 3. CONSULTA DE VEHÍCULOS Y USUARIOS (FILTRO)
SELECT 
    v.placa, 
    u.primer_nombre, 
    u.primer_apellido, 
    p.zona, 
    p.numero
FROM vehiculo v
JOIN usuario u 
    ON v.id_usuario = u.id_usuario
JOIN reserva r 
    ON v.id_vehiculo = r.id_vehiculo 
JOIN parqueadero p 
    ON r.id_parqueadero = p.id_parqueadero
WHERE v.placa LIKE 'ABC%' 
   OR u.primer_nombre LIKE '%Juan%';


-- 4. ELIMINAR HISTORIAL ANTIGUO (PRIMERO)
DELETE FROM historial 
WHERE id_registro IN (
    SELECT id_registro 
    FROM registro 
    WHERE entrada < '2025-01-01'
);

-- 5. Verificar que sí se eliminó
SELECT * 
FROM registro
WHERE entrada < '2025-01-01';
