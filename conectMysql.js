
/*
var mysql = require('mysql');


var conection = mysql.createConnection({
  host:'daml.ddns.net',
  user:'aurelio',
  password:'Aurelio',
  database:'investlab'
});
conection.connect(
  function functionName(error){
    if(!!error){
      console.log('deu ruim');
    }else{
        console.log('foi!');
        selectCadastro();
      }
  }
);

const selectCadastro = function () {
  conection.query('SELECT * from t_cadastro', function (error, results, fields) {
    if (error) throw error;
    console.log('Meu resultado: ', results);
    //this.state= results;
  });
}
*/


var mysql = require('mysql');

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



exports.listCadastro = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM t_cadastro',function(err,rows){
            //em caso de erro
            if(err)
      //          console.log("Error ao selecionar a  tabela cadastro : %s ",err );

        //    res.render('pages/cadastro',{page_title:"Cadastro de Ações",data:rows});
        return results;
         });
    });
};
