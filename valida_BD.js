
const _ = require('lodash');
//campos do cadastro
function Acao(str){

if(str.length>6)
    return("A acão máximo 6 caracteres.");

  if(str.length<1)
    return("Preencher ao menos 1 caracter na ação.");

  if(str == "SELECIONAR")
    return("Selecione um registro.");

  if(str == "Sem registros")
      return("Não há  ação no momento.");

  else return true;
}
function Desc(str){
  if(str.length>30)return("O máximo 30 caracteres");
    if(str.length<1)return("Preencher ao menos 1 caracter");
      return true;
}
// campos cadastro->compra
function Data(data){
return true;
}

function QTD(num){
    if(num<1) return("Quantidade inválido");
    return true;
}
function Valor(val){
if(val<1) return("Valor inválido");
  return true;
}
// campos cadastro->compra->vendas
function IR(val){
  if(val<0) return("IR Inválido");
  if(val>99) return("IR acima do limite");
  return true;
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
   return(err);
}

module.exports = {Cadastro,Compra,Venda};
