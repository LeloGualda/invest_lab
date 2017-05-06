
//campos do cadastro
function Acao(str){
if(str.length>6)
    return("O máximo 6 caracteres");
  if(str.length<1)
    return("Preencher ao menos 1 caracter");
  else return true;
}
function Desc(str){
  if(str.length>30)
      return("O máximo 30 caracteres");
    if(str.length<1)
      return("Preencher ao menos 1 caracter");
      return true;
}
// campos cadastro->compra
function Data(data){

}
function QTD(num){
    if(num<1) return("Quantidade inválido");
}
function Valor(val){
if(val<1) return("Valor inválido");
}
// campos cadastro->compra->vendas
function IR(val){
  if(val<0) return("IR Inválido");
  if(val>99) return("IR acima do limite");
  return true;
}

module.exports = {Data, Acao,Desc,QTD,Valor,IR};
