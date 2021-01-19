ALTER TABLE alumnos CONVERT TO CHARACTER SET latin1 COLLATE 'latin1_swedish_ci';

DELIMITER //
CREATE PROCEDURE getAllAlumnos()
BEGIN
	SELECT *  FROM alumnos 
    ORDER BY 
    matricula DESC;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS traerAlumnosPorGrado;
DELIMITER //
CREATE PROCEDURE traerAlumnosPorGrado(
    IN valor  INT)
BEGIN
   
    SELECT *  FROM alumnos 
    WHERE grado = valor
    ORDER BY 
    matricula DESC;

END//

DELIMITER ;

DROP PROCEDURE IF EXISTS traerAlumnosPorID;
DELIMITER //
CREATE PROCEDURE traerAlumnosPorID(
    IN valor  INT)
BEGIN
   
    SELECT *  FROM alumnos 
    WHERE id_alumno = valor
    ORDER BY 
    matricula DESC;

END//

DELIMITER ;

DROP PROCEDURE IF EXISTS traerAlumnosPorCURP;
DELIMITER //
CREATE PROCEDURE traerAlumnosPorCURP(
    IN valor  TEXT)
BEGIN
   
    SELECT *  FROM alumnos 
    WHERE curp LIKE CONCAT('%', valor , '%')
    ORDER BY 
    matricula DESC;

END//

DELIMITER ;

DROP PROCEDURE IF EXISTS traerAlumnosPorNombre;
DELIMITER //
CREATE PROCEDURE traerAlumnosPorNombre(
    IN valor  TEXT)
BEGIN
   
    SELECT *  FROM alumnos 
    WHERE nombres LIKE CONCAT('%', valor , '%')
    ORDER BY 
    matricula DESC;

END//

DELIMITER ;

DROP PROCEDURE IF EXISTS traerAlumnosPorApellido;
DELIMITER //
CREATE PROCEDURE traerAlumnosPorApellido(
    IN valor  TEXT)
BEGIN
   
    SELECT *  FROM alumnos 
    WHERE apellidos LIKE CONCAT('%', valor , '%')
    ORDER BY 
    matricula DESC;

END//

DELIMITER ;


DROP PROCEDURE IF EXISTS traerAlumnosPorApellido;
DELIMITER //
CREATE PROCEDURE traerAlumnosPorApellido(
    IN valor  TEXT)
BEGIN
   
    SELECT *  FROM alumnos 
    WHERE apellidos LIKE CONCAT('%', valor , '%')
    ORDER BY 
    matricula DESC;

END//

DELIMITER ;


DROP PROCEDURE IF EXISTS guardarAlumno;
DELIMITER //
CREATE PROCEDURE guardarAlumno(
    IN var_nom      TEXT,
    IN var_ap       TEXT,
    IN var_matr     TEXT,
    IN var_curp     TEXT,
    IN var_email    TEXT,
    IN var_dob      DATE,
    IN var_grad     INT,
    IN var_genero   INT,
    IN var_ingreso  DATE
    )
BEGIN
   
    INSERT INTO alumnos 
    SET 
        nombres             = var_nom,
        apellidos           = var_ap,
        matricula           = var_matr,
        curp                = var_curp,
        email               = var_email,
        fecha_nacimiento    = var_dob,
        grado               = var_grad,
        genero              = var_genero,
        fecha_ingreso       = var_ingreso
    ;

END//

DELIMITER ;



DROP PROCEDURE IF EXISTS editarAlumno;
DELIMITER //
CREATE PROCEDURE editarAlumno(
    IN var_nom      TEXT,
    IN var_ap       TEXT,
    IN var_matr     TEXT,
    IN var_curp     TEXT,
    IN var_email    TEXT,
    IN var_dob      DATE,
    IN var_grad     INT,
    IN var_genero   INT,
    IN var_id       INT
    )
BEGIN
   
    UPDATE alumnos 
    SET 
        nombres             = var_nom,
        apellidos           = var_ap,
        matricula           = var_matr,
        curp                = var_curp,
        email               = var_email,
        fecha_nacimiento    = var_dob,
        grado               = var_grad,
        genero              = var_genero
    WHERE id_alumno         = var_id
    ;

END//
DELIMITER ;


DROP PROCEDURE IF EXISTS cambiarStatus;
DELIMITER //
CREATE PROCEDURE cambiarStatus(
    IN var_id       INT
    )
BEGIN
    DECLARE stts INT DEFAULT 1;

    SELECT activo
    INTO   stts
    FROM   alumnos
    WHERE  id_alumno = var_id;

    IF stts > 0 THEN
        UPDATE alumnos SET activo = 0 WHERE id_alumno = var_id;
    ELSE
        UPDATE alumnos SET activo = 1 WHERE id_alumno = var_id;
    END IF;

END//
DELIMITER ;


DROP PROCEDURE IF EXISTS traerActivos;
DELIMITER //
CREATE PROCEDURE traerActivos(
    IN var_activo       INT
    )
BEGIN
   SELECT COUNT(*) as activos, grado FROM alumnos WHERE activo = var_activo GROUP BY grado;

END//

DELIMITER ;
