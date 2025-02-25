DELIMITER $$

CREATE PROCEDURE importa_solicitud (
    IN p_idventa INT,
    IN p_tipo INT,
    IN p_dato INT,
    IN p_concepto VARCHAR(100)
)
BEGIN
    DECLARE v_idconcepto INT;
    DECLARE v_cliente_exists INT;
    DECLARE v_idmovcli INT;
    DECLARE v_idsolicitud INT;
    DECLARE v_cia INT;
    SET v_cia = 1;

    -- Buscar el concepto en la tabla conceptos
    SELECT id INTO v_idconcepto 
    FROM datosolicitud 
    WHERE concepto = p_concepto and cia = v_cia;

    -- Si no existe el concepto, agregarlo
    IF v_idconcepto IS NULL THEN
        INSERT INTO datosolicitud  (concepto, cia) VALUES (p_concepto, v_cia);
        SET v_idconcepto = LAST_INSERT_ID();
    END IF;

    -- Buscar el dato en las solicitudes
    IF p_concepto <> '' THEN
        SELECT id INTO v_idsolicitud
        FROM solicitudes where idcliente = p_idventa and iddato = p_dato;
    
        IF v_idsolicitud IS NULL THEN
            INSERT INTO solicitudes (
                idcliente, tipo, iddato, iddatosolicitud, status, cia
            ) VALUES (
                p_idventa, p_tipo, p_dato, v_idconcepto, 'A', v_cia
            );
            SET v_idsolicitud = LAST_INSERT_ID();
        ELSE
            UPDATE solicitudes set iddatosolicitud = v_idconcepto WHERE id = v_idsolicitud;
        END IF;
    END IF;
    

    -- Si todo es exitoso, hacemos commit
    SELECT v_idsolicitud;

END$$

DELIMITER ;
