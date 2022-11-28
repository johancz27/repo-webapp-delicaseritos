const connection = require('../../../config/db');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.session.loggedin){
        connection.query('SELECT codigo,nombre FROM inventario', (err, ingredientes) => {
            connection.query('SELECT nit,nombre FROM proveedores', (err, provs) => {
                connection.query('SELECT * FROM compras', (err, i_p) => {
                    // Mapear proveedores por nit
                    let nit_provs = {}
                    for (let p in provs) {
                        nit_provs[provs[p].nit] = provs[p]
                    }
                    // Mapear in ingredientes por id
                    let id_ingredientes = {}
                    for (let i in ingredientes) {
                        id_ingredientes[ingredientes[i].codigo] = ingredientes[i]
                    }
                    let ingredientes_provs = []
                    for (let i in i_p) {
                        let prov_id = i_p[i].nit,
                            ingrediente_id = i_p[i].idIngrediente;
                        ingredientes_provs.push({
                            idCompra: i_p[i].idCompra,
                            cantidad: i_p[i].cantidad,
                            valor: i_p[i].valor,
                            ingrediente: id_ingredientes[ingrediente_id].nombre,
                            proveedor: nit_provs[prov_id].nombre
                        })
                    }
                    res.render("../views/inventario/forms/compras.ejs", {
                        login: true,
                        name: req.session.name,
                        compras: i_p,
                        ingredientes: ingredientes,
                        nit: provs,
                        ingredientes_provs: ingredientes_provs
                        
                    });
                })
            });
        });

    } else{
        res.redirect('/');
    }
})

router.post('/agregar', (req, res) => {
    if (req.session.loggedin) {
        const { proveedores, ingredientes } = req.body;

        let ingredientes_map = [],
            i = 0;
        for (let campo in req.body) {
            let match = campo.match(/ingrediente_([0-9]+)/);
            if (match != null) {
                ingredientes_map.push({
                    cantidad: req.body[campo],
                    valor: req.body[campo],
                    codigo: match[1],
                    selected: ingredientes[i] == "on"
                });
                i ++;
            }
        }
        for (let m in ingredientes_map) {
            let map = ingredientes_map[m]
            if (map.selected) {
                connection.query("INSERT INTO compras SET ?", {
                    cantidad: map.cantidad,
                    valor: map.valor,
                    nit: proveedores,
                    idIngrediente: map.codigo,
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.render("../views/error-window.ejs")
        
                    } else {
                        res.redirect('/inventario/compras');
                    }
                });
            }
        }
    } else {
        res.redirect('/');
    }
});

router.post('/modificar/:idCompra', (req, res) => {
    const idCompra = req.params.idPlato;
    const {cantidad, valor, idIngrediente, nit} = req.body;
    connection.query('UPDATE compras SET cantidad = ?, valor = ?, idIngrediente = ?, nit = ? WHERE idCompra = ?', 
    [cantidad, valor, idIngrediente, nit, idCompra],
    (err, result) => {   
        if (err){
            console.log(err);
            res.redirect('/server_error');
        } else{
            res.redirect('/inventario/compras');
        }	
    });
})

router.get('/eliminar/:idCompra', (req, res) => {
    const idCompra = req.params.idCompra;
    connection.query('DELETE FROM compras WHERE idCompra = ?', [idCompra], (err, result) => {
		if(err){
            console.log(err);
            res.redirect('/server_error')
        } else{
            res.redirect('/inventario/compras');
        }	
    });
})

module.exports = router;