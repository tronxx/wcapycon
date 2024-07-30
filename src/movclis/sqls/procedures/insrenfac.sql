DELIMITER $$

CREATE PROCEDURE add_renfac(
    IN p_idfactura INT,
    IN p_idventa,
    IN p_codigo varchar(13),
    IN p_descri varchar(100),
    IN p_serie varchar(100),
    IN p_preciou DOUBLE,
    IN p_canti INT,
    IN p_piva DOUBLE,
    IN p_importe DOUBLE,
    IN p_iva DOUBLE,
    IN p_folio INT,
    IN p_status VARCHAR(1),
    IN p_cia INT,
)
BEGIN
    DECLARE v_iddescri INT;
    DECLARE v_cliente_exists INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- En caso de error, hacemos rollback
        ROLLBACK;
    END;

    -- Iniciar transacción
    START TRANSACTION;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO v_cliente_exists
    FROM ventas
    WHERE id = p_idventa;

    IF v_cliente_exists = 0 THEN
        -- Si el cliente no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venta no encontrada';
    END IF;

    -- Buscar el concepto en la tabla conceptos
    SELECT id INTO v_iddescri 
    FROM conceptos 
    WHERE concepto = p_descri;

    -- Si no existe el concepto, agregarlo
    IF v_idconcepto IS NULL THEN
        INSERT INTO conceptos (concepto) VALUES (p_descri);
        SET v_idconcepto = LAST_INSERT_ID();
    END IF;

    -- Agregar el registro en la tabla renfac
    INSERT INTO movclis (
        idventa, fecha, coa, idconcepto, idpoliza, consecutivo, tipopago, 
        recobon, importe, cobratario, usuario, status, idcobratario, idusuario, cia
    ) VALUES (
        p_idventa, p_fecha, p_coa, v_idconcepto, p_idpoliza, p_consecutivo, p_tipopago, 
        p_recobon, p_importe, p_cobratario, p_usuario, p_status, p_idcobratario, p_idusuario, p_cia
    );

    -- Actualizar el cliente según el campo coa
    IF p_coa = 'A' THEN
        UPDATE ventas SET abonos = abonos + p_importe, fechasaldo = p_fecha WHERE id = p_idventa;
    ELSEIF p_coa = 'C' THEN
        UPDATE ventas SET cargos = cargos + p_importe WHERE id = p_idventa;
    END IF;

    -- Devolver el registro insertado
    SELECT * FROM movclis WHERE id = LAST_INSERT_ID();

    -- Si todo es exitoso, hacemos commit
    COMMIT;
END$$

DELIMITER ;
