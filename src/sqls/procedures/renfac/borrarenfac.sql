DELIMITER $$

CREATE PROCEDURE del_renfac(
    IN p_id INT
)
BEGIN
    DECLARE v_importe DOUBLE;
    DECLARE v_iva DOUBLE;
    DECLARE v_idfactura INT;

    SELECT idfactura, importe, iva
    INTO v_idfactura, v_importe, v_iva
    FROM renfac
    WHERE id = p_id;

    -- Ajustar el campo correspondiente en la tabla facturas
    UPDATE facturas SET importe = importe - v_importe,
      iva = iva - v_iva,
      total = total - v_importe - v_iva
     WHERE id = v_idfactura;

END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_before_delete_renfac
BEFORE DELETE ON renfac
FOR EACH ROW
BEGIN
    CALL del_renfac(OLD.id);
END $$

DELIMITER ;
