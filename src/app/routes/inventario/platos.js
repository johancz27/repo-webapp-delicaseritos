const connection = require('../../../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.loggedin){
        connection.query('SELECT * FROM platos', (err, result) => {
			res.render("../views/inventario/forms/platos", {
                login: true,
                name: req.session.name,
				platos: result
			});
		});
    } else{
        res.redirect('/');
    }
})

router.post('/agregar', (req, res) => {
    const { nombrePlato, precio } = req.body;
    connection.query("SELECT * FROM platos WHERE nombrePlato = ?", [nombrePlato], (err, result) => {
        if(result.length === 0){
            connection.query("INSERT INTO platos SET ?",{
                nombrePlato: nombrePlato,
                precio: precio
            }, 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.render("../views/error-window.ejs")
                } else {
                    res.redirect('/inventario/platos');
                }
            });
        } else{
            res.render('../views/inventario/forms/platos.ejs',{
                alert: true,
                alertTitle: "El plato ya existe",
                alertMessage: "Revise para evitar réplicas",
                alertIcon: "warning",
                showConfirmButton: false,
                timer: 15000,
                ruta: '/inventario/platos'
            });
        }
    });
});

router.post('/modificar/:idPlato', (req, res) => {
    const idPlato = req.params.idPlato;
    const {nombrePlato, precio} = req.body;
    connection.query('UPDATE platos SET nombrePlato = ?, precio = ? WHERE idPlato = ?',[nombrePlato,precio,idPlato],
    (err, result) => {   
        if (err){
            console.log(err);
            res.render("../views/error-window.ejs")
        } else{
            res.redirect('/inventario/platos');
        }	
    });
});

router.get('/eliminar/:idPlato', (req, res) => {
    const idPlato = req.params.idPlato;
    connection.query('DELETE FROM platos WHERE idPlato = ?', [idPlato], (err, result) => {
        if(err){
            console.log(err);
            res.render("../views/error-window.ejs")
        } else{
            res.redirect('/inventario/platos');
        };	
    });
});

module.exports = router;