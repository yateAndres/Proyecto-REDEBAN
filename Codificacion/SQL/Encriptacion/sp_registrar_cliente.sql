CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registrar_cliente`(
    IN p_primer_nombre VARCHAR(50),
    IN p_segundo_nombre VARCHAR(50),
    IN p_primer_apellido VARCHAR(50),
    IN p_segundo_apellido VARCHAR(50),
    IN p_documento VARCHAR(20),
    IN p_telefono VARCHAR(15),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_password_hash VARCHAR(255);
    DECLARE v_id_rol INT;
    DECLARE v_id_estado INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT FALSE AS success, 'Error al registrar usuario' AS mensaje;
    END;

    START TRANSACTION;

    main_block: BEGIN

        -- Validar documento
        IF EXISTS (SELECT 1 FROM usuario WHERE documento = p_documento) THEN
            SELECT FALSE AS success, 'Documento ya registrado' AS mensaje;
            ROLLBACK;
            LEAVE main_block;
        END IF;

        -- Validar email
        IF EXISTS (SELECT 1 FROM usuario WHERE email = p_email) THEN
            SELECT FALSE AS success, 'Email ya registrado' AS mensaje;
            ROLLBACK;
            LEAVE main_block;
        END IF;

        -- Encriptar contraseña
        SET v_password_hash = SHA2(p_password, 256);

        -- Obtener rol Cliente
        SELECT id_rol INTO v_id_rol
        FROM rol
        WHERE nombre = 'Cliente'
        LIMIT 1;

        IF v_id_rol IS NULL THEN
            SELECT FALSE AS success, 'Rol Cliente no existe' AS mensaje;
            ROLLBACK;
            LEAVE main_block;
        END IF;

        -- Obtener estado Activo
        SELECT id_estado INTO v_id_estado
        FROM estado_usuario
        WHERE nombre = 'Activo'
        LIMIT 1;

        IF v_id_estado IS NULL THEN
            SELECT FALSE AS success, 'Estado Activo no existe' AS mensaje;
            ROLLBACK;
            LEAVE main_block;
        END IF;

        -- Insertar usuario
        INSERT INTO usuario (
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            documento,
            telefono,
            email,
            p_password,
            id_rol,
            id_estado
        ) VALUES (
            p_primer_nombre,
            p_segundo_nombre,
            p_primer_apellido,
            p_segundo_apellido,
            p_documento,
            p_telefono,
            p_email,
            v_password_hash,
            v_id_rol,
            v_id_estado
        );

        SET v_id_usuario = LAST_INSERT_ID();

        COMMIT;

        SELECT 
            TRUE AS success,
            'Usuario registrado correctamente' AS mensaje,
            v_id_usuario AS id_usuario,
            p_email AS email;

    END main_block;

END