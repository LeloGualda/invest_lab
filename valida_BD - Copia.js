
const _ = require('lodash');
//campos do cadastro


function Acao(str){

if(str == "-"){
  return("2");
}
if(str.length>6)
    return("0");

  if(str.length<1)
    return("1");

  if(str == "SELECIONAR")
    return("2");

  if(str == "Sem registros")
      return("3");
  if(str.length>0 && str.length<7) return true;
  else{return("0");}
}

function Desc(str){
    if(str.length>30)
          return("4");
    if(str.length<1)
          return("5");
    if(str == '-')
          return("6");
      return true;
}
// campos cadastro->compra
function Data(data){
return true;
}

function QTD(num){
  if(num){
    if(num<1) return("7");
    return true;
  }else return("7");
}
function Valor(val){
  if(val){
if(val<1) return("8");
  return true;
}else return("8");
}
// campos cadastro->compra->vendas
function IR(val){
  if(val){
  if(val<0) return("9");
  if(val>99) return("10");
  return true;}
  else return("9");
}

function Cadastro(dados){
  let validando = [
    {validacao : Acao(dados.codigo_cadastro)},
    {validacao : Desc(dados.descricao_cadastro)}
  ]
      return(Validando(validando));
}
function Compra(dados){
  let validando = [
    {validacao : Acao(dados.codigo_produto)},
    {validacao : QTD(dados.quantidade_compra)},
    {validacao : Valor(dados.valor_compra)}
  ]

      return(Validando(validando));
}

function Venda(dados){
  let validando = [
    {validacao : Acao(dados.t_produto_codigo_produto )},
    {validacao : Valor(dados.valor_compra)},
    {validacao : Valor(dados.valor_venda)},
    {validacao : Valor(dados.lucrobruto_venda)},
    {validacao : Valor(dados.lucroliquido_venda)},
    {validacao : QTD(dados.quantidade_venda)}
  ]
      return(Validando(validando));
}

function Validando(validando){
  // para quando todas as validações forem verdadeiras
    if(_.every(validando,['validacao',true])) return true;
//remove todos os verdadeiros e remove os erros reptidos
    let err = _.sortedUniqBy(
                  _.pullAllBy(validando, [{ 'validacao': true }], 'validacao'),
                  'validacao'
              );
   return(err.map(function(num)
   {
          return   num.validacao
  }
          ));
}

module.exports = {Cadastro,Compra,Venda};
