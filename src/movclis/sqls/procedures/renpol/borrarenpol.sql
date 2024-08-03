-- Se crea el procedure para Eliminar el renpol

DELIMITER $$


CREATE PROCEDURE del_renpol (
    IN p_id INT
)
BEGIN
    DECLARE v_idmovcli INT;
    DECLARE v_idventa INT;
    DECLARE v_idpoliza INT;
    DECLARE v_importe DOUBLE;
    DECLARE v_bonif DOUBLE;
    DECLARE v_recar DOUBLE;
    DECLARE v_rob DOUBLE;
    DECLARE v_coa VARCHAR(1);
    DECLARE v_tipo VARCHAR(2);
    DECLARE v_cliente_exists INT;

    -- Iniciar transacción

    -- Obtener los datos del registro en movclis antes de eliminarlo
    SELECT id, idventa, idpoliza, importe, tipo, rob
    INTO v_idmovcli, v_idventa, v_idpoliza, v_importe, v_tipo, v_rob
    FROM renpol
    WHERE id = p_id;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO v_cliente_exists
    FROM ventas
    WHERE id = v_idventa;

    IF v_cliente_exists = 0 THEN
        -- Si el cliente no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venta no encontrada';
    END IF;

    -- Actualizar los valores en la tabla ventas
    IF v_importe != 0 THEN
          UPDATE ventas set abonos = abonos - v_importe WHERE id = v_idventa;
    END IF;

    set v_recar = 0;
    set v_bonif = 0;

    IF v_tipo = 'AB' THEN
       SET v_bonif = v_rob;
    ELSE
       SET v_recar = v_rob;
    END IF;

    UPDATE polizas set importe = importe - v_importe,
       recar = recar - v_recar,
       bonif = bonif - v_bonif
       WHERE id = v_idpoliza;

    -- Confirmar la transacción
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_before_delete_renpol
BEFORE DELETE ON renpol
FOR EACH ROW
BEGIN
    CALL del_renpol (OLD.id);
END $$

DELIMITER ;
