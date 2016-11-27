var Produto = require('../models/produto');

exports.view = function(req, res) {
    Produto.findById(req.params.id, function(err, produto) {
        if (err)
            res.send(err);

        res.json(produto);
    });
};

exports.delete = function(req, res) {
    Produto.remove({ _id: req.params.id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Produto deletado com sucesso.' });
    });
}

exports.list = function(req, res) {
    Produto.find({})
        .exec(function(err, produtos) {
            if (err)
                res.send(err);

            res.json(produtos);
        });
};

exports.create = function(req, res) {
    var produto = new Produto();

    saveProduto(req, res, produto, "Produto criado com sucesso.");
};

exports.update = function(req, res) {
    Produto.findById(req.params.id, function(err, produto) {
        if (err)
            res.send(err);
            
        saveProduto(req, res, produto, 'Produto modificado com sucesso!');
    });
};

function saveProduto(req, res, produto, message) {
    produto.nome = req.body.nome;
    
    produto.save(function(err) {
        if (err)
            res.send(err);
    
        res.json({ message: message });
    });
}