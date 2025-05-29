DELIMITER $$

CREATE PROCEDURE add_renpol_sin_movclis (
    IN p_idpoliza INT,
    IN p_idventa INT,
    IN p_fecha DATE,
    IN p_conse INT,
    IN p_sino VARCHAR(1),
    IN p_concepto VARCHAR(100),
    IN p_tipo VARCHAR(2),
    IN p_rob DOUBLE,
    IN p_importe DOUBLE,
    IN p_vence DATE,
    IN p_comision DOUBLE,
    IN p_dias INT,
    IN p_tienda VARCHAR(4),
    IN p_cobratario VARCHAR(4),
    IN p_letra INT,
    IN p_iduuid INT,
    IN p_idfactura INT,
    IN p_cia INT,
    IN p_usuario VARCHAR(4),
    IN p_idcobratario INT,
    IN p_idusuario INT,
    IN p_salcli DOUBLE

)
BEGIN
    DECLARE v_idconcepto INT;
    DECLARE v_cliente_exists INT;
    DECLARE v_poliza_exists INT;
    DECLARE v_idrenpol INT;
    DECLARE v_idmovcli INT;
    

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO v_cliente_exists
    FROM ventas
    WHERE id = p_idventa;

    set v_idmovcli = -1;

    IF v_cliente_exists = 0 THEN
        -- Si el cliente no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venta no encontrada';
    END IF;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO v_poliza_exists
    FROM polizas
    WHERE id = p_idpoliza;

    IF v_poliza_exists = 0 THEN
        -- Si el cliente no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Póliza no encontrada';
    END IF;

    -- Agregar el registro en la tabla renpol
    INSERT INTO renpol (
        idpoliza, conse, idventa, sino, concepto, tipo, 
        rob, importe, vence, comision, dias, tienda, cobratario, 
        letra, iduuid, idfactura, cia, salcli
    ) VALUES (
        p_idpoliza, p_conse, p_idventa, p_sino, p_concepto, p_tipo, 
        p_rob, p_importe, p_vence, p_comision, p_dias, p_tienda, p_cobratario,
        p_letra, p_iduuid, p_idfactura, p_cia, p_salcli
    );

    SET v_idrenpol = LAST_INSERT_ID();

    -- Actualizar la Póliza
    IF p_tipo = 'AB' THEN
      UPDATE polizas SET importe = importe + p_importe, 
      bonif = bonif + p_rob
      WHERE id = p_idpoliza;
    ELSE 
      UPDATE polizas SET importe = importe + p_importe, 
      recar = recar + p_rob
      WHERE id = p_idpoliza;
    END IF;

    -- Buscar el concepto en la tabla conceptos
    SELECT id INTO v_idconcepto 
    FROM conceptos 
    WHERE concepto = p_concepto;

    -- Si no existe el concepto, agregarlo
    IF v_idconcepto IS NULL THEN
        INSERT INTO conceptos (concepto) VALUES (p_concepto);
        SET v_idconcepto = LAST_INSERT_ID();
    END IF;

    -- Elimino que no se actualicen los movimientos de clientes

    -- Devolver el registro insertado
    select v_idrenpol, v_idmovcli;

END$$

DELIMITER ;
