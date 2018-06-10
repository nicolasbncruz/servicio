//usuarios.js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//creando el esquema (BD) y la coleccion (tabla)
var esquemaUsuario = mongoose.Schema({
  usuario:{type:String,unique:true},
  clave:String
});

//encriptando la clave de usuarios
esquemaUsuario.pre('save',function(next){
  var usuario = this;
  if(!usuario.isModified('clave')){
    return next();
  }
  bcrypt.genSalt(10,function(err,salt){
    if (err) {
      return next(err);
    }
    bcrypt.hash(usuario.clave,salt,function(err,hash){
      if (err) {
        return next(err);
      }
      usuario.clave = hash;
      next();
    });
  });
});

//metodo para comparar la clave
esquemaUsuario.methods.comparaClave = function(clave,cb){
  bcrypt.compare(clave,this.clave, function(err,resultado){
    if (err) {
      return cb(err);
    }
    cb(null,resultado);
  });
};

module.exports = mongoose.model('usuarios',esquemaUsuario);
