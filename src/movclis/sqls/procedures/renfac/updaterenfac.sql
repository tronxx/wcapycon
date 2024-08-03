DELIMITER $$

CREATE TRIGGER before_update_renfac
BEFORE UPDATE ON renfac
FOR EACH ROW
BEGIN
    DECLARE v_old_importe DOUBLE;
    DECLARE v_old_iva DOUBLE;

    -- Obtener el importe y coa actuales del registro a actualizar
    SET v_old_importe = OLD.importe;
    SET v_old_iva = OLD.iva;

    -- Ajustar el campo correspondiente en la tabla facturas
    UPDATE facturas SET importe = importe - v_old_importe,
      iva = iva - v_old_iva,
      total = total - v_old_importe - v_old_iva
     WHERE id = OLD.idfactura;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_update_renfac
AFTER UPDATE ON renfac
FOR EACH ROW
BEGIN
    -- Ajustar el campo correspondiente en la tabla facturas
    UPDATE facturas SET importe = importe + NEW.importe,
      iva = iva + NEW.iva,
      total = total + NEW.importe + NEW.iva
     WHERE id = NEW.idfactura;
END$$

DELIMITER ;

