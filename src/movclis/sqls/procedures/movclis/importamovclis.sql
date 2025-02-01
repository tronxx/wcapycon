DELIMITER $$

CREATE PROCEDURE importa_movcli (
    IN p_idventa INT,
    IN p_fecha DATE,
    IN p_coa VARCHAR(1),
    IN p_idconcepto INT,
    IN p_idpoliza INT,
    IN p_consecutivo INT,
    IN p_tipopago VARCHAR(2),
    IN p_recobon DOUBLE,
    IN p_importe DOUBLE,
    IN p_cobratario VARCHAR(4),
    IN p_usuario VARCHAR(4),
    IN p_status VARCHAR(1),
    IN p_idcobratario INT,
    IN p_idusuario INT,
    IN p_cia INT,
    IN p_concepto VARCHAR(100)
)
BEGIN
    DECLARE v_idconcepto INT;
    DECLARE v_cliente_exists INT;
    DECLARE v_idmovcli INT;

    -- Buscar el concepto en la tabla conceptos
    SELECT id INTO v_idconcepto 
    FROM conceptos 
    WHERE concepto = p_concepto;

    -- Si no existe el concepto, agregarlo
    IF v_idconcepto IS NULL THEN
        INSERT INTO conceptos (concepto) VALUES (p_concepto);
        SET v_idconcepto = LAST_INSERT_ID();
    END IF;

    -- Agregar el registro en la tabla movclis
    INSERT INTO movclis (
        idventa, fecha, coa, idconcepto, idpoliza, consecutivo, tipopago, 
        recobon, importe, cobratario, usuario, status, idcobratario, idusuario, cia
    ) VALUES (
        p_idventa, p_fecha, p_coa, v_idconcepto, p_idpoliza, p_consecutivo, p_tipopago, 
        p_recobon, p_importe, p_cobratario, p_usuario, p_status, p_idcobratario, p_idusuario, p_cia
    );

    SET v_idmovcli = LAST_INSERT_ID();

    -- Si todo es exitoso, hacemos commit
    SELECT v_idmovcli;

END$$

DELIMITER ;
