var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LojaSchema = new Schema({
    nome: { type: String, required: true },
    visitas: [{
        data: { type: Date, required: true },
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        produtos: [{ type: Schema.Types.ObjectId, ref: 'Produto' }]
    }]
});

module.exports = mongoose.model('Loja', LojaSchema);