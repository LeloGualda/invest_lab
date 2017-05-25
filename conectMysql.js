
const  validar = require('./valida_BD');
var dados =
{
   codigo_cadastro    : "1es123",
   descricao_cadastro : "",
 };

 
 /*

 conection.query('UPDATE investlab.t_compra SET ( '+
      'quantidade_compra = '+ dados.quantidade_compra + ',' +
      'valor_compra = '+ dados.valor_compra + ',' +
      'data_compra = '+ dados.data_compra + ')'+
       'WHERE codigo_compra = '+ dados.id_compra +')',
	function (error, results, fields) {
        if (error) throw error;
           response.redirect('/compra');
        }
conection.query('UPDATE investlab.t_cadastro SET ( '+
      'descricao_cadastro = '+ dados.descricao_cadastro + ',' +
      'WHERE codigo_cadastro = '+ dados.codigo_cadastro +')',
	function (error, results, fields) {
        if (error) throw error;
           response.redirect('/cadastro');
        }
conection.query('UPDATE investlab.t_compra SET ( '+
      'quantidade_venda = '+ dados.quantidade_venda + ',' +
      'valor_venda = '+ dados.valor_venda + ',' +
      'data_venda = '+ dados.data_venda + ')'+
       'WHERE codigo_venda = '+ dados.id_venda +')',
	function (error, results, fields) {
        if (error) throw error;
           response.redirect('/venda');
        }
*/
console.log(validar.Cadastro(dados));
