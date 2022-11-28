const connection = require('../../../config/db');
const express = require('express');
const router = express.Router();

const ingredientes_routes = require('./ingredientes');
const platos_routes = require('./platos');
const compras_routes = require('./compras');
const proveedores_routes = require('./proveedores');
//const ingredientesPlato_routes = require('./ingredientes-plato');
//const calculo_produccion_routes = require("./calculos/produccion");


router.get('/', (req, res) => {
  if (req.session.loggedin){
    res.render('principal')
  } else{
    res.redirect('/');
  }
});


/* Sub-módulos */
router.use('/ingredientes', ingredientes_routes);
router.use('/platos', platos_routes);
router.use('/compras', compras_routes);
router.use('/proveedores', proveedores_routes);
//router.use('/ingredientes-plato', ingredientesPlato_routes);
//router.use('/calculos/calculo_produccion', calculo_produccion_routes);

module.exports = router;