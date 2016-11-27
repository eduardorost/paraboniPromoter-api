var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
    nome: { type: String, required: true }
});

module.exports = mongoose.model('Produto', ProdutoSchema);