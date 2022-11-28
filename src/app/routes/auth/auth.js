/*
 Rutas de inicio de sesión y registro de usuario
*/

const bcryptjs = require('bcryptjs');
const connection = require('../../../config/db');
const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/login',(req,res) => {
    res.render('../views/auth/login.ejs');
})

router.post('/login', async(req,res) => {
    /* Inicio de sesión (autenticación) */
    const {email,pass} = req.body;
    if(email && pass){
        connection.query('SELECT * FROM users WHERE email=?', [email], async(error,result)=>{
            if (error) {
                console.log(error);
            } else if (result.length !== 0 && (await bcryptjs.compare(pass,result[0].pass))){
                /* Inicio de sesión correcto */
                req.session.loggedin = true;
                res.render('../views/principal.ejs',{
                    alert: true,
                    alertTitle: "Inicio de sesión",
                    alertMessage: "Inició sesión correctamente",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 15000,
                    ruta: '/',
                    login: true,
                    name: result[0].name
                });
                
            } else {
                /* Inicio de sesin incorrecto:
                    El usuario ingresó con email o password incorrectos 
                */
                res.render('../views/auth/login.ejs',{
                    alert: true,
                    alertTitle: "No se pudo iniciar sesión",
                    alertMessage: "Datos inválidos",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 15000,
                    ruta: '/auth/login'
                });
            }
        })
    }
})

router.get('/register',(req,res) => {
    res.render('../views/auth/register.ejs');
})

router.post('/register', async (req,res) => {
    /* Registro de usuario */
    const {user,email,pass} = req.body;
    let passwordHaash = await bcryptjs.hash(pass,8);
    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(result.length === 0){
            connection.query("INSERT INTO users SET?",{
                user:user,
                email:email,
                pass:passwordHaash
            }, 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.render("../views/error-window.ejs")
                } else {
                    res.redirect('/auth/login');
                }
            });
        } else {
            res.render('../views/auth/login.ejs',{
                alert: true,
                alertTitle: "Registro exitoso",
                alertMessage: "Su usuario ha sido creado",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 15000,
                ruta: '/auth/login'
            });
        }
    });
})

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
})

module.exports = router;