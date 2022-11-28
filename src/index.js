const app = require('./config/server');
const connection = require('./config/db');

//require('./app/routes/routes')(app);

app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto: ",app.get('port'))
})