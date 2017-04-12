var mysql = require('mysql');


var conection = mysql.createConnection({
  host:'daml.ddns.net',
  user:'aurelio',
  password:'Aurelio',
  database:'investlab'
});
conection.connect(
  function functionName(error)
  {
    if(!!error)
    {
      console.log('deu ruim');
    }else
      {
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
