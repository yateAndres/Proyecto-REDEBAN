CREATE DEFINER=`root`@`localhost` PROCEDURE `p_encriptar_password_sha2`(
    IN p_password VARCHAR(255),
    OUT p_password_hash VARCHAR(255)
)
BEGIN
    DECLARE v_salt VARCHAR(64);
    DECLARE v_hash VARCHAR(64);

    -- Validar contraseña
    IF p_password IS NULL OR p_password = '' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'La contraseña no puede estar vacía';
    END IF;

    -- Generar salt único
    SET v_salt = SHA2(UUID(), 256);

    -- Generar hash
    SET v_hash = SHA2(CONCAT(p_password, v_salt), 256);

    -- Formato final: salt:hash
    SET p_password_hash = CONCAT(v_salt, ':', v_hash);

END