-- Se crea el procedure para ajustar a las ventas

DELIMITER $$


CREATE PROCEDURE del_movclis(
    IN p_id INT
)
BEGIN
    DECLARE v_idmovcli INT;
    DECLARE v_idventa INT;
    DECLARE v_importe DOUBLE;
    DECLARE v_coa VARCHAR(1);
    DECLARE v_cliente_exists INT;

    -- Iniciar transacción

    -- Obtener los datos del registro en movclis antes de eliminarlo
    SELECT id, idventa, importe, coa
    INTO v_idmovcli, v_idventa, v_importe, v_coa
    FROM movclis
    WHERE id = p_id;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO v_cliente_exists
    FROM ventas
    WHERE idventa = v_idventa;

    IF v_cliente_exists = 0 THEN
        -- Si el cliente no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venta no encontrada';
    END IF;

    -- Actualizar los valores en la tabla ventas
    IF v_importe != 0 THEN
        IF V_COA = 'A' THEN
          UPDATE ventas set abonos = abonos - v_importe WHERE idventa = v_idventa;
        ELSE
          UPDATE ventas set cargos = cargos - v_importe WHERE idventa = v_idventa;
        END IF;
    END IF;

    -- Confirmar la transacción
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_before_delete_movclis
BEFORE DELETE ON movclis
FOR EACH ROW
BEGIN
    CALL del_movclis(OLD.id);
END $$

DELIMITER ;
