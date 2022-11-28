const connection = require('../../../config/db');
const express = require('express');
const router = express.Router();

/* proveedores: /proveedores
    get:
        - /
    post:
        - /agregar
        - /modificar
        - /eliminar
*/

router.get('/', (req, res) => {
    if (req.session.loggedin){
        connection.query('SELECT * FROM proveedores', (err, result) => {
			res.render("../views/inventario/forms/proveedores", {
                login: true,
                name: req.session.name,
				proveedores: result
			});
		});
    } else{
        res.redirect('/');
    }
})

router.post('/agregar', (req, res) => {
    const { nit, telefono, nombre, tipoProducto } = req.body;
    connection.query("SELECT * FROM proveedores WHERE telefono = ?", [telefono], (err, result) => {
        if(result.length === 0){
            connection.query("INSERT INTO proveedores SET ?",{
                nit: nit,
                telefono: telefono,
                nombre: nombre,
                tipoProducto: tipoProducto
            }, 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.render("../views/error-window.ejs")
                } else {
                    res.redirect('/inventario/proveedores');
                }
            });
        } else{
            res.send("Este ingrediente YA EXISTE. Revise para evitar réplicas.")
        }
    });
});

router.post('/modificar/:nit', (req, res) => {
    const nit = req.params.nit;
    const { telefono, nombre, tipoProducto} = req.body;
    connection.query('UPDATE proveedores SET telefono = ?, nombre = ?, tipoProducto = ? WHERE nit = ?', 
    [telefono,nombre,tipoProducto, nit],
    (err, result) => {   
        if (err){
            console.log(err);
            res.render("../views/error-window.ejs")
        } else{
            res.redirect('/inventario/proveedores');
        }	
    });
})

router.get('/eliminar/:nit', (req, res) => {
    const nit = req.params.nit;
    connection.query('DELETE FROM proveedores WHERE nit = ?', [nit], (err, result) => {
		if(err){
            console.log(err);
            res.render("../views/error-window.ejs")
        } else{
            res.redirect('/inventario/proveedores');
        }	
    });})

module.exports = router;