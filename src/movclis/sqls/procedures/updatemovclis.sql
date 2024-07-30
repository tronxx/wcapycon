DELIMITER $$

CREATE TRIGGER before_update_movclis
BEFORE UPDATE ON movclis
FOR EACH ROW
BEGIN
    DECLARE v_old_coa VARCHAR(1);
    DECLARE v_old_importe DOUBLE;

    -- Obtener el importe y coa actuales del registro a actualizar
    SET v_old_coa = OLD.coa;
    SET v_old_importe = OLD.importe;

    -- Ajustar el campo correspondiente en la tabla clientes según el valor de coa anterior
    IF v_old_coa = 'A' THEN
        UPDATE ventas SET abonos = abonos - v_old_importe WHERE id = OLD.idventa;
    ELSEIF v_old_coa = 'C' THEN
        UPDATE ventas SET cargos = cargos - v_old_importe WHERE id = OLD.idventa;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_update_movclis
AFTER UPDATE ON movclis
FOR EACH ROW
BEGIN
    -- Ajustar el campo correspondiente en la tabla clientes según el valor de coa nuevo
    IF NEW.coa = 'A' THEN
        UPDATE ventas SET abonos = abonos + NEW.importe WHERE id = NEW.idventa;
    ELSEIF NEW.coa = 'C' THEN
        UPDATE ventas SET cargos = cargos + NEW.importe WHERE id = NEW.idventa;
    END IF;
END$$

DELIMITER ;
