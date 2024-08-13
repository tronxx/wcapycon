DELIMITER $$

CREATE PROCEDURE busca_nombre (
    IN p_appat VARCHAR(100),
    IN p_apmat VARCHAR(100),
    IN p_nombre1 VARCHAR(100),
    IN p_nombre2 VARCHAR(100)
)
BEGIN
    DECLARE v_idnombre INT;

    -- Buscar el nombre en la tabla nombres
    SELECT id INTO v_idnombre
    FROM nombres
    WHERE appat = p_appat 
    AND apmat = p_apmat
    AND nompil1 = p_nombre1
    AND nompil2 = p_nombre2;

    -- Si no existe el concepto, agregarlo
    IF v_idnombre IS NULL THEN
        INSERT INTO nombres (appat, apmat, nompil1, nompil2)
        VALUES (p_appat, p_apmat, p_nombre1, p_nombre2);
        SET v_idnombre = LAST_INSERT_ID();
    END IF;

    SELECT * from nombres where id = v_idnombre;

END$$

DELIMITER ;
