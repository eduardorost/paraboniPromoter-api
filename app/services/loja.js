var Loja = require('../models/loja');

exports.view = function(req, res) {
    Loja.findById(req.params.id, function(err, loja) {
        if (err)
            res.send(err);

        res.json(loja);
    }).populate('visitas.usuario')
      .populate('visitas.produtos');
};

exports.delete = function(req, res) {
    Loja.remove({ _id: req.params.id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Loja deletada com sucesso.' });
    });
}

exports.list = function(req, res) {
    Loja.find({})
        .populate('visitas.usuario')
        .populate('visitas.produtos')
        .exec(function(err, lojas) {
            if (err)
                res.send(err);

            res.json(lojas);
        });
};

exports.create = function(req, res) {
    var loja = new Loja();

    loja.nome = req.body.nome;
    loja.visitas = req.body.visitas;
    
    loja.save(function(err) {
        if (err)
            res.send(err);
    
        res.json({ message: "Loja criada com sucesso." });
    });
};
