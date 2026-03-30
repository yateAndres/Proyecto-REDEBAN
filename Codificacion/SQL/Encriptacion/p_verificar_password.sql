CREATE DEFINER=`root`@`localhost` PROCEDURE `p_verificar_password`(
    IN p_password VARCHAR(255),
    IN p_hash_guardado VARCHAR(255),
    OUT p_valido BOOLEAN
)
BEGIN
    DECLARE v_salt VARCHAR(64);
    DECLARE v_hash VARCHAR(64);
    DECLARE v_hash_calculado VARCHAR(64);

    -- Extraer salt y hash
    SET v_salt = SUBSTRING_INDEX(p_hash_guardado, ':', 1);
    SET v_hash = SUBSTRING_INDEX(p_hash_guardado, ':', -1);

    -- Recalcular hash
    SET v_hash_calculado = SHA2(CONCAT(p_password, v_salt), 256);

    -- Comparar
    SET p_valido = (v_hash = v_hash_calculado);

END