
var mysql = require('mysql');
const  validar = require('./valida_BD');

/********************
      conectando ao banco de dados
*********************/
var conection = mysql.createConnection({
  host:'investlab.ddns.net',
  user:'investlab',
  password:'Investlab',
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
/********************
      CONSULTAS DA PAGINA CADASTRO
*********************/


  function GetCadastro (request, response,next,msg){
    StringSQL = 'SELECT * FROM t_cadastro';
    var query = conection.query(StringSQL,function(err,rows){
    resp = null;         // resposta inicial
    if(err)resp = err;  // caso de erro
    else resp = rows; // consulta realizada com sucesso!
           response.render('pages/cadastro',{data:resp,msg});
      });
};

 function InsertCadastro(request, response,next) {
    var input = JSON.parse(JSON.stringify(request.body));
     var dados =  {     codigo_cadastro    : input.codigo_cadastro,
                        descricao_cadastro : input.descricao_cadastro,
      };
  var vald = validar.Cadastro(dados);
      if(vald == true){
            var query = conection.query("INSERT INTO t_cadastro set ? ",dados, function(err, rows){
          response.redirect('/cadastro');
          });
        }
        else  response.redirect('/cadastro/'+vald);

}

function DeleteCadastro (request, response,next,input) {

   var query = conection.query('DELETE FROM investlab.t_cadastro where codigo_cadastro = "' + input + '"',
   function(err,rows){
        if(err){
            console.log("Error ao selecionar a  tabela cadastro : %s ",err );
          }
        response.redirect('/cadastro');
      })
 }
 function DeleteCadastro (request, response,next,input) {

    var query = conection.query('DELETE FROM investlab.t_cadastro where codigo_cadastro = "' + input + '"',
    function(err,rows){
         if(err){
             console.log("Error ao selecionar a  tabela cadastro : %s ",err );
           }
         response.redirect('/cadastro');
       })
  }
  function UpdateCadastro(request, response,next){

    var input = JSON.parse(JSON.stringify(request.body));

    var stringSQL = "update investlab.t_cadastro set codigo_cadastro ="
    +"'"+ input.codigo_cadastro  +"', descricao_cadastro = " +
     "'"+ input.descricao_cadastro  + "' where codigo_cadastro = '" + input.codigo_h + "'";

    var vald = validar.Cadastro(input);

if(vald == true){
    var query = conection.query(stringSQL,
    function(err,rows){
         if(err){
             console.log("Error ao selecionar a  tabela cadastro : %s ",err );
           }
         response.redirect('/cadastro');
       })
     }else{response.redirect('/cadastro/' + vald);}
  }
  /********************
         Conultas da Compra
  *********************/
function GetCompra(request, response,next,msg){
  var selectCadastro  =   null;
  var selectCompras   =   null;
  var query = conection.query('SELECT * FROM t_cadastro',function(err,rows){
      //em caso de erro
      if(err){
          console.log("Error ao selecionar a  tabela cadastro : %s ",err );
          selectCadastro = err;
          selectCompras = err;
            response.render('pages/compra',{data:selectCadastro, dataCompra:selectCompras,msg});
        }else {
            selectCadastro = rows;
            var queryCompras = conection.query('SELECT * FROM t_compra',function(errCompra,rowsCompra){
              if(errCompra){
                  console.log("Error ao selecionar a  tabela cadastro : %s ",errCompra );
                  selectCompras = err;
                }else {
                selectCompras =  rowsCompra;
                response.render('pages/compra',{data:selectCadastro, dataCompra:selectCompras,msg});
                next();
              }
            });
        }
   });
}

function DeleteCompra(request, response,next) {
 var input = JSON.parse(JSON.stringify(request.body));
 console.log(input);
var dadosEstoque = {
   codigo_acao:input.codigo_produto,
   quantidade_estoque:input.valor_compra,
   valor_total:parseFloat(input.quantidade_compra) * parseFloat(input.valor_compra)
}
   var query = conection.query('DELETE FROM investlab.t_compra where codigo_compra = "' + input.codigo_compra + '"',
   function(err,rows){
        if(err){
            console.log("Error ao selecionar a  tabela cadastro : %s ",err );
            response.redirect('/compra/');
        }else{

        var  stringSQLEstoque = "UPDATE investlab.t_estoque SET " +
          "codigo_acao = '" + dadosEstoque.codigo_acao + "'," +
          "quantidade_estoque = (quantidade_estoque - " + dadosEstoque.quantidade_estoque + "), " +
          "valor_total = (valor_total - " + dadosEstoque.valor_total + ")" +
          "WHERE codigo_acao = '"  + dadosEstoque.codigo_acao + "'";


              conection.query(stringSQLEstoque,function (error, results, fields) {
                    if(error){
                stringSQLEstoqueDelete ='DELETE FROM investlab.t_estoque where codigo_acao = "' + dadosEstoque.codigo_acao + '"';
                      conection.query(stringSQLEstoqueDelete,
                      function (error, results, fields) {
                            if(error) console.log(error);
                              response.redirect('/compra/');
                      });

                    }
                    else{console.log('update');
                      response.redirect('/compra/');}
              });
        }


      });
 }


 function InsertCompra(request, response,next) {

    var input = JSON.parse(JSON.stringify(request.body));
    var dados = {
       codigo_produto: input.codigo_produto ,
       quantidade_compra:parseInt(input.quantidade_compra),
       valor_compra: parseFloat(input.valor_compra),
       data_compra:input.compra_data,
       valor_total: (parseFloat(input.quantidade_compra) * parseFloat(input.valor_compra))
     };
   var vald = validar.Compra(dados);

   if(vald == true){
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




        conection.query(stringSQL,function (error, results, fields) {});


        var dadosEstoque = {
            codigo_acao:input.codigo_produto,
            quantidade_estoque:input.quantidade_compra,
            valor_total:parseFloat(input.quantidade_compra) * parseFloat(input.valor_compra)
        }
            var query = conection.query("INSERT INTO t_estoque set ? ",dadosEstoque,function (error, results, fields) {
              if(error){
                stringSQLEstoque = "UPDATE investlab.t_estoque SET " +
                "codigo_acao = '" + dadosEstoque.codigo_acao + "'," +
                "quantidade_estoque = (quantidade_estoque + " + dadosEstoque.quantidade_estoque + "), " +
                "valor_total = (valor_total + " + dadosEstoque.valor_total + ")" +
                "WHERE codigo_acao = '"  + dadosEstoque.codigo_acao + "'";

                  conection.query(stringSQLEstoque,function (error, results, fields) {
                      if(error)console.log(error);
                  response.redirect('/compra');
                });
              }
              else{response.redirect('/compra/');}
            });

      }else{response.redirect('/compra/'+vald);}
}
function UpdateCompra(request, response,next){

  var input = JSON.parse(JSON.stringify(request.body));

  var stringSQL =
    "update investlab.t_compra set " +
    "quantidade_compra = " + parseFloat(input.att_qnt) + "," +
    "valor_compra ="  +   parseFloat(input.att_val)  + "," +
    "valor_total =" +  (parseFloat(input.att_val) * parseFloat(input.att_qnt)) +
    " where codigo_compra = " +  input.id_up_compra;
    console.log(input);


    var stringSQLEstoque =  "UPDATE investlab.t_estoque SET " +
    "quantidade_estoque = (select sum(quantidade_compra) as total from investlab.t_compra where codigo_produto =" +  "'" + input.trc_cod + "'" +
		"), valor_total = (select sum(valor_total) as total from investlab.t_compra where codigo_produto =" +
       "'" + input.trc_cod +"'" + "group by codigo_produto) WHERE codigo_acao =" +"'" + input.trc_cod +"'"
console.log(stringSQLEstoque);
    var query = conection.query(stringSQL, function(err,rows){
         if(err)console.log("Error ao selec ionar a  tabela cadastro : %s ",err );

                      conection.query(stringSQLEstoque,function (error, results, fields) {
                          if(error)console.log(error);
                      });
         response.redirect('/compra');

       })

}


/********************
      Conultas da da venda
*********************/
function GetVenda(request, response,next,msg) {

  var selectCompras  =   null;
  var selectVendas   =   null;
/*

"select" +
   " investlab.t_estoque.codigo_acao as codigo_produto,"+
       " investlab.t_estoque.quantidade_estoque as quantidade_compra,"+
       " investlab.t_estoque.valor_total as valor_compra," +
       " (investlab.t_estoque.quantidade_estoque/investlab.t_estoque.valor_total) as media"+
       " from  t_estoque;"; */ 



 stringSQL =  "Select sum(quantidade_estoque) as quantidade_compra, sum(valor_total) as valor_compra," +
  "round((sum(valor_total)/sum(quantidade_estoque) ),2) as media," +
  "codigo_acao as codigo_produto from t_estoque group by codigo_acao;"

  var query = conection.query(stringSQL,function(err,rows){
      //em caso de erro
      if(err){
          console.log("Error ao selecionar a  tabela cadastro : %s ",err );
          selectCompras = err;
          response.render('pages/venda',{data:err, dataVenda:err,msg});

        }else {
            selectCompras = rows;
            var queryCompras = conection.query('SELECT * FROM t_venda',function(errVenda,rowsVenda){
              if(errVenda){
                  console.log("Error ao selecionar a  tabela cadastro : %s ",errVenda );
                  selectVendas = errVenda;
                }else {
                selectVendas =  rowsVenda;
                response.render('pages/venda',{data:selectCompras, dataVenda:selectVendas,msg});
                next();
              }
            });

        }
   });
}

function InsertVendas(request, response,next){
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

//  var vald = validar.Venda(dados);

//if(vald == true){

var  stringSQLEstoque = "UPDATE investlab.t_estoque SET " +
  "codigo_acao = '" + dados.t_produto_codigo_produto + "'," +
  "quantidade_estoque = (quantidade_estoque - " + dados.quantidade_venda+ "), " +
  "valor_total = (valor_total)" +
  "WHERE codigo_acao = '"  + dados.t_produto_codigo_produto +  "'";

  console.log(stringSQLEstoque);
    conection.query(stringSQLEstoque,function (error, results, fields) {});

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
  /*    }
    else{

      response.redirect('/venda/'+ vald);
    }*/
}


function GetReport(request, response,next) {


  var selectCompras  =   null;
  var selectVendas   =   null;
  stringSQL ="select * from t_compra";
  stringSQLv ="select * from t_venda";


      var msg = '';

  conection.query(stringSQL,function (error, results, fields) {
     if(error) console.log(error);
     selectCompras  =results;

     conection.query(stringSQLv,function (error, results, fields) {
     selectVendas =results
     response.render('pages/relatorio',{data:selectCompras, dataVenda:selectVendas,msg});
   });

   });
/*
        conection.query(stringSQLv,function (error, results, fields) {  if(error) console.log(error);
        selectVendas =results  });


next(); */
}

module.exports = {GetCadastro,InsertCadastro,DeleteCadastro,UpdateCadastro,GetCompra,DeleteCompra,InsertCompra,UpdateCompra,GetVenda,InsertVendas,GetReport};
