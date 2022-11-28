CREATE DATABASE deliCaseritosDB;
USE deliCaseritosDB;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(225) NOT NULL
);

CREATE TABLE inventario (
    codigo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    vigencia VARCHAR(20) NOT NULL,
    gramoBase FLOAT NOT NULL,
    precioBase DECIMAL NOT NULL
);

CREATE TABLE platos (
    idPlato INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    precio FLOAT NOT NULL
);

CREATE TABLE proveedores (
    nit VARCHAR(11) NOT NULL PRIMARY KEY,
    telefono VARCHAR(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    tipoProducto VARCHAR(60) NOT NULL
);

//Tablas creadas hasta aquí
CREATE TABLE compras (
    idCompra INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    valor INT NOT NULL,
    idIngrediente INT,
    FOREIGN KEY `idingrediente_ibfk_1` (idIngrediente) REFERENCES `inventario` (`codigo`) ON DELETE NO ACTION ON UPDATE CASCADE,
    nit INT,
    FOREIGN KEY `nit_ibfk_2`(nit) REFERENCES `proveedores` (`nit`) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE ingredientes_platos (
    idIP INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    gramos INT NOT NULL,
    idPlato INT NOT NULL ADD CONSTRAINT `idplato_ibfk_1` FOREIGN KEY (`idPlato`) REFERENCES `platos`(`idPlato`) ON DELETE CASCADE ON UPDATE CASCADE,
    idIngrediente INT NOT NULL ADD CONSTRAINT `idingrediente_ibfk_2` FOREIGN KEY (`idIngrediente`) REFERENCES `inventario`(`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE produccion_plato {
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
    idPlato INT NOT NULL ADD CONSTRAINT `platos_ibfk_1` FOREIGN KEY (`idPlato`) REFERENCES `platos`(`idPlato`) ON DELETE NO ACTION ON UPDATE CASCADE,
    cantidad INT NOT NULL,
    total_ingredientes TEXT NOT NULL
}