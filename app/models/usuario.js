var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    login: { type: String, required: true },
    senha: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);