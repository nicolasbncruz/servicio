//usuarios.js

//creando la coleccion: 'usuarios' en la BD: 'esquemaUsuario'
var usuario = require('../models/usuarios');

exports.Autenticar = function(req,res){
  usuario.findOne({usuario:req.body.usuario},function(err,miUsuario){
    if (err) {
      res.status(500).json({mensaje:'error con el servicio de autenticacion'});
    }
    else {
    if (!miUsuario) {
      res.status(401).json({mensaje:'Usuario no existe'});
    }
    else {
      miUsuario.comparaClave(req.body.clave, function(err,resultado){
        if(err){
          res.status(500).json({mensaje:'problemas con el proceso de encriptación'});
        }
        else{
          if(!resultado){
            res.status(401).json({mensaje:'Error en su clave'});
          }else {
            res.status(200).json({
              status:'ok',
              mensaje:'Autenticación correcta',
              TOKEN:''
            });
          }
        }
      });
    }
    }
  });
};

exports.Listar = function(req,res){
  usuario.find(function(err,resultado){
    if (err) {
      res.status(500)
      .json({mensaje: 'error al listar los usuarios'});
    }else {
      res.status(200).json(resultado);
    }
  });
};

exports.Agregar = function(req, res){
  var nuevoUsuario = new usuario();
  nuevoUsuario.usuario = req.body.usuario;
  nuevoUsuario.clave = req.body.clave;
  nuevoUsuario.save(function(err,resultado){
  if (err) {
    res.status(500)
    .json({mensaje:'error al registrar al usuario'});
  }else {
    res.status(200).json(resultado);
  }
  });
};
