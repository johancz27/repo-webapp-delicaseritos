// Rutas
const connection = require('../../config/db');
const express = require('express');
const router = express.Router();

const auth_routes = require('./auth/auth')
const inventario_routes = require('./inventario/index')

router.get('/', (req,res) => {
    if (req.session.loggedin){
        res.render('../views/principal.ejs',{
            login: true,
            name: req.session.user
        });
    } else{
        res.render('../views/index.ejs',{
            login: false,
            name:""
        });
    }
})

router.get('/server_error', (req, res) => {
    res.render('../views/error-window.ejs');
})
router.get('/acercade', (req, res) => {
    res.render('../views/acercaDe.ejs');
})

/* Los sub-modulos principales:
        auth
        inventario 
*/
// Incluir sub-modulo 'auth' 
router.use('/auth', auth_routes);

// Incluir sub-modulo 'inventario'
router.use('/inventario', inventario_routes);


module.exports = router;