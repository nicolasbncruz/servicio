//server.js

//agregando las referencias
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var config = require('./config');
var usuarioController = require('./controllers/usuarios');

//conectando a la bd MongoDB
mongoose.connect(config.cadenaConexion, function(err){
      if (err) {
        console.log('Error con el servidor');
      }else {
        console.log('Conexión correcta!!');
      }
    });

//trabajando con express : para trabajar con servicios rest
var app = express();
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:false}));

//manejando los ruteos: cuando llegue una solicitud,
//sabrá a que ruta debe dirigirse
var router = express.Router();

router.route('/usuarios')
.get(usuarioController.Listar)
.post(usuarioController.Agregar);

app.use('/api',router);
app.listen(3000);
