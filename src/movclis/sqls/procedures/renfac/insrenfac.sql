DELIMITER $$

CREATE PROCEDURE add_renfac(
    IN p_idfactura INT,
    IN p_idventa INT,
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
    IN p_cia INT
)
BEGIN
    DECLARE v_iddescri INT;
    DECLARE v_cliente_exists INT;
    DECLARE v_conse INT;
    DECLARE v_importe DOUBLE;
    DECLARE v_iva DOUBLE;


    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- En caso de error, hacemos rollback
        ROLLBACK;
    END;

    -- Iniciar transacción
    START TRANSACTION;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO v_cliente_exists
    FROM facturas
    WHERE id = p_idfactura;
    SET v_importe = round(p_canti * p_preciou, 4);
    SET v_iva = round(v_importe * p_piva / 100, 4);

    SELECT max(conse + 1) INTO v_conse
    FROM renfac 
    WHERE idfactura = p_idfactura;

    IF v_conse is null THEN
       SET v_conse = 1;
    END IF;


    IF v_cliente_exists = 0 THEN
        -- Si el cliente no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Factura no encontrada';
    END IF;


    -- Agregar el registro en la tabla renfac
    INSERT INTO renfac (
        idfactura, idventa, conse, codigo, descri, serie, 
        folio, canti, preciou, importe, piva, iva, cia  ) VALUES (

        p_idfactura, p_idventa, v_conse, p_codigo, p_descri, p_serie,
        p_folio,  p_canti, p_preciou, v_importe, p_piva, 
        v_iva, p_cia
    );

    -- Actualizar el cliente según el campo coa
    UPDATE facturas SET importe = importe + v_importe,
      iva = iva + v_iva,
      total = total + v_importe + v_iva
     WHERE id = p_idfactura;

    -- Devolver el registro insertado
    SELECT * FROM renfac WHERE id = LAST_INSERT_ID();

    -- Si todo es exitoso, hacemos commit
    COMMIT;
END$$

DELIMITER ;
