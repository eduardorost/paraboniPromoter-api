var port = process.env.PORT || 9000;
var mongoServer = process.env.MONGODB_URL || 'mongodb://localhost:27017/parabonipromoters';

var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var corsOptions = {
    exposedHeaders: ['x-access-token']
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect(mongoServer, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + mongoServer + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + mongoServer);
    }
});

app.get('/', function(req, res) {
    res.json({ message: 'API IS UP' });
});

var security = require('./app/services/security')
router.route('/auth')
    .post(security.auth);

// middleware to use for all requests below
// router.use(security.verifyToken);

// Produto
var produto = require('./app/services/produto');

router.route('/produtos')
    .get(produto.list)
    .post(produto.create);
router.route('/produtos/:id')
    .get(produto.view)
    .put(produto.update)
    .delete(produto.delete)

// Loja
var loja = require('./app/services/loja');

router.route('/lojas')
    .get(loja.list)
    .post(loja.create);
router.route('/lojas/:id')
    .get(loja.view)
    .delete(loja.delete)

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);