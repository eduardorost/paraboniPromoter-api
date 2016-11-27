var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var config = require('../../config')

exports.auth = function(req, res) {
    Usuario
        .findOne(req.body)
        .then(function(usuario) {
            if (!usuario) {
                res.sendStatus(401);
            } else {
                var token = jwt.sign(
                    { login: usuario.login },
                    config.secret,
                    { expiresIn: 84600 }
                );

                res.set('x-access-token', token);
                res.end();
            }
        }, function(error) {
            res.sendStatus(401);
        });

};

exports.verifyToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        res.sendStatus(401);
    } else {
        jwt.verify(token, config.secret, function name(err, decoded) {
            if (err) {
                res.sendStatus(401);
            } else {
                req.usuario = decoded;
                next();
            }
        });
    }
};