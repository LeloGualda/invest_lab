
var express = require('express');
var app = express();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var json = require('express-json');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
const  validar = require('./valida_BD');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser());

app.use(json());

var conection = mysql.createConnection({
  host:'daml.ddns.net',
  user:'aurelio',
  password:'Aurelio',
  database:'investlab'
});
conection.connect(
  function functionName(error){
    if(!!error){
      console.log('erro ao conectar!');
    }else{
        console.log('conectado ao banco de dados investlab');
      }
  }
);


app.get('/', function(request, response,next) {
  response.render('pages/index')
  next();
});

app.post('/DeleteCompra', function(request, response,next) {
 var input = JSON.parse(JSON.stringify(request.body));

   var query = conection.query('DELETE FROM investlab.t_compra where codigo_compra = "' + input.codigo_compra + '"',function(err,rows){
        if(err)
            console.log("Error ao selecionar a  tabela cadastro : %s ",err );
        else
            console.log(input.codigo_compra + '  deletado');
        response.redirect('/compra');
      });
 });

 app.post('/DeleteCadastro', function(request, response,next) {
  var input = JSON.parse(JSON.stringify(request.body));

    var query = conection.query('DELETE FROM investlab.t_cadastro where codigo_cadastro = "' + input.codigo_produto + '"',function(err,rows){
         if(err)
             console.log("Error ao selecionar a  tabela cadastro : %s ",err );
         else
             console.log(input.codigo_produto + '  deletado');
         response.redirect('/cadastro');
       });
  });
app.get('/compra', function(request, response,next)
{
  var selectCadastro  =   null;
  var selectCompras   =   null;
  var query = conection.query('SELECT * FROM t_cadastro',function(err,rows){
      //em caso de erro
      if(err){
          console.log("Error ao selecionar a  tabela cadastro : %s ",err );
          selectCadastro = err;
          selectCompras = err;
            response.render('pages/compra',{data:selectCadastro, dataCompra:selectCompras});
        }else {
            selectCadastro = rows;
            var queryCompras = conection.query('SELECT * FROM t_compra',function(errCompra,rowsCompra){
              if(errCompra){
                  console.log("Error ao selecionar a  tabela cadastro : %s ",errCompra );
                  selectCompras = err;
                }else {
                selectCompras =  rowsCompra;
                response.render('pages/compra',{data:selectCadastro, dataCompra:selectCompras});
                next();
              }
            });

        }
   });

});

app.get('/cadastro', function(request, response,next) {
var query = conection.query('SELECT * FROM t_cadastro',function(err,rows){
    //em caso de erro
    if(err){
      response.render('pages/cadastro',{data:err});

      }
   response.render('pages/cadastro',{data:rows});

 });

});

app.get('/cadastro/edit',function(request,response,next){
response.render('pages/edit_cadastro');
});
app.get('/venda', function(request, response,next) {

  var selectCompras  =   null;
  var selectVendas   =   null;
  var stringSQL = "Select sum(quantidade_compra) as quantidade_compra,"   +
  "sum(valor_compra) as valor_compra, sum(valor_total) as valor_total," +
   "round((sum(valor_total)/sum(quantidade_compra) ),2) as media,"        +
 "codigo_produto from t_compra group by codigo_produto";
console.log(stringSQL);
  var query = conection.query(stringSQL,function(err,rows){
      //em caso de erro
      if(err){
          console.log("Error ao selecionar a  tabela cadastro : %s ",err );
          selectCompras = err;
          response.render('pages/venda',{data:err, dataVenda:err});

        }else {
            selectCompras = rows;
            var queryCompras = conection.query('SELECT * FROM t_venda',function(errVenda,rowsVenda){
              if(errVenda){
                  console.log("Error ao selecionar a  tabela cadastro : %s ",errVenda );
                  selectVendas = errVenda;
                }else {
                selectVendas =  rowsVenda;
                console.log(selectCompras);
                response.render('pages/venda',{data:selectCompras, dataVenda:selectVendas});
                next();
              }
            });

        }
   });

});

app.post('/cadastro', function(request, response) {

 var input = JSON.parse(JSON.stringify(request.body));

 var dados =
 {
    codigo_cadastro    : input.codigo_cadastro,
    descricao_cadastro : input.descricao_cadastro,
  };
var vald = validar.Cadastro(dados);


if(vald == true){
  var query = conection.query("INSERT INTO t_cadastro set ? ",dados, function(err, rows)
      {
          response.redirect('/cadastro');
      });
}
else response.redirect('/cadastro');


});


app.post('/compra', function(request, response) {

 var input = JSON.parse(JSON.stringify(request.body));
 var dados = {
    codigo_produto: input.codigo_produto ,
    quantidade_compra:parseInt(input.quantidade_compra),
    valor_compra: parseFloat(input.valor_compra),
    data_compra:input.compra_data,
    valor_total: (parseFloat(input.quantidade_compra) * parseFloat(input.valor_compra))
  };

var vald = validar.Compra(dados);

console.log("entrou");
var stringSQL = 'INSERT INTO t_compra ( '+
  'codigo_produto, ' +
  'quantidade_compra,' +
  'valor_compra,'+
  'valor_total,'+
  'data_compra)'+
   'VALUES("' +
    dados.codigo_produto +'",'+
    dados.quantidade_compra +','+
    dados.valor_compra +','+
    dados.valor_total +',"'+
    dados.data_compra + '")';

if(vald){
  console.log(stringSQL);
          conection.query(stringSQL,
              function (error, results, fields) {
                if (error) console.log(error) ;
                  response.redirect('/compra');
              }

            );
        }
  else {
     response.redirect('/compra');
   }
  });


 app.post('/venda', function(request, response) {
  var input = JSON.parse(JSON.stringify(request.body));

  var valor_lucroB = (parseFloat(input.valor_venda) - parseFloat(input.valor_compra)) * parseInt(input.quantidade_venda) ;
  var valor_lucroL  = valor_lucroB - (valor_lucroB * (input.IR /100));

  var dados = {
        t_produto_codigo_produto:input.codigo_acao,
        valor_compra:parseFloat(input.valor_compra),
        valor_venda:parseFloat(input.valor_venda),
        lucrobruto_venda: valor_lucroB ,
        lucroliquido_venda:valor_lucroL,
        quantidade_venda:parseInt(input.quantidade_venda),
        data_venda: input.data_venda
      };

  var vald = validar.Venda(dados);
if(vald){
       conection.query('INSERT INTO t_venda ( '+
         't_produto_codigo_produto, ' +
         'valor_compra,' +
         'valor_venda,' +
         'lucrobruto_venda,' +
         'lucroliquido_venda,' +
         'quantidade_venda,' +
         'data_venda)'+
         'VALUES("' +
              dados.t_produto_codigo_produto +  '",'  +
              dados.valor_compra  + ','  +
              dados.valor_venda + ','  +
              dados.lucrobruto_venda +  ','  +
              dados.lucroliquido_venda +  ','  +
              dados.quantidade_venda +  ',"'  +
              dados.data_venda + '")',
           function (error, results, fields) {
             if (error) throw error;
             response.redirect('/venda');
        });
      }
    else{response.redirect('/venda');}
  });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
