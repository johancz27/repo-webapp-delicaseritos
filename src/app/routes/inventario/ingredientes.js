const connection = require('../../../config/db');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.session.loggedin){
        connection.query('SELECT * FROM inventario', (err, result) => {
			res.render("../views/inventario/forms/ingredientes", {
                login: true,
                name: req.session.name,
				inventario: result
			});
		});
    } else{
        res.redirect('/');
    }
})

router.post('/agregar', (req, res) => {
    const { nombre, cantidad, vigencia, gramoBase, precioBase } = req.body;
    connection.query("SELECT * FROM inventario WHERE nombre = ?", [nombre], (err, result) => {
        if(result.length === 0){
            connection.query("INSERT INTO inventario SET?",{
                nombre: nombre,
                cantidad: cantidad,
                vigencia: vigencia,
                gramoBase: gramoBase,
                precioBase: precioBase
            }, 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.render("../views/error-window.ejs")
                } else {
                    res.redirect('/inventario/ingredientes');
                }
            });
        } else{
            res.render('../views/inventario/forms/ingredientes.ejs',{
                alert: true,
                alertTitle: "Ingrediente ya existe",
                alertMessage: "Asegúrese de no repetir ingredientes",
                alertIcon: "warning",
                showConfirmButton: false,
                timer: 15000,
                ruta: '/inventario/ingredientes'
            });
        }
    });
});

router.post('/modificar/:codigo', (req, res) => {
    const codigo = req.params.codigo;
    const {nombre, cantidad, vigencia, gramoBase, precioBase} = req.body;
    connection.query('UPDATE inventario SET nombre = ?, cantidad = ?, vigencia = ?, gramoBase = ?, precioBase = ? WHERE codigo = ?', 
    [nombre,cantidad,vigencia,gramoBase,precioBase, codigo],
    (err, result) => {   
        if (err){
            console.log(err);
            res.render("../views/error-window.ejs")
        } else{
            res.redirect('/inventario/ingredientes');
        }	
    });
});

router.get('/eliminar/:codigo', (req, res) => {
    const codigo = req.params.codigo;
    console.log(res);
    connection.query('DELETE FROM inventario WHERE codigo = ?', [codigo], (err, result) => {
		if(err){
            console.log(err);
            res.render("../views/error-window.ejs")
        } else{
            res.redirect('/inventario/ingredientes');
        }	
    });
})


module.exports = router;