
var express = require('express');
var app = express();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var json = require('express-json');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
const  validar = require('./valida_BD');
const  conSQL = require('./conectMysql');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(json());

app.get('/', function(request, response,next) {
  response.render('pages/index',{msg});
  next();
});



let msg = "";
 /********************
       ROTDAS  DA PAGINA CADASTRO
 *********************/

app.get('/cadastro/:id*?', function(request, response,next){
  conSQL.GetCadastro(request, response,next, request.params.id);
});
app.post('/cadastro', conSQL.InsertCadastro);

app.post('/DeleteCadastro',function  (request, response,next) {
      var input = JSON.parse(JSON.stringify(request.body));
  conSQL.DeleteCadastro(request, response,next, input.codigo_produto);
 });
 app.post('/UpdateCadastro',conSQL.UpdateCadastro);

  /********************
        ROTAS  DA PAGINA COMPRA
  *********************/

 app.get('/compra/:id*?',function(request,response,next){
   conSQL.GetCompra(request, response,next, request.params.id);
 } );

 app.post('/compra',conSQL.InsertCompra );

 app.post('/DeleteCompra',conSQL.DeleteCompra);

 app.post('/UpdateCompra',conSQL.UpdateCompra);

 /********************
       ROTAS  DA PAGINA COMPRA
 *********************/

app.get('/venda/:id*?',function(request,response,next){
    conSQL.GetVenda(request,response,next,request.params.id)
});
 app.post('/venda/:id*?',conSQL.InsertVendas);



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/********************
      ROTAS  DA PAGINA RELATORIO
*********************/

app.get('/relatorio', function(request, response,next) {
conSQL.GetReport(request, response,next);
});
