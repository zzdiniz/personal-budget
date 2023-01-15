
function popUp(x){                               //controle do popUp lancado ao cadastrar um novo registro
    console.log("Clique efetuado");
    let blur=document.getElementById("blur");
    let popUp=document.getElementById("pop-up");

    if(popUp.className!=="" || popUp.className){//se estiver ativo, desativa
        popUp.className="";
        blur.className="";
        blur.style="display:none;";
    }
    else{                                       //se estivar desativado,ativa
        popUp.className="active";
        blur.className="active"; 
        blur.style="display:block;";
        if(x==true){
            let title=document.getElementById('title');
            let h5=title.children[0];
            h5.innerHTML="Registro inserido com sucesso";
            h5.style="color:#28a745;";
            let content=document.getElementById('content');
            let p=content.children[0];
            p.innerHTML="Despesa foi cadastrada com sucesso!";
            let btn=document.getElementById('btn');
            let button=btn.children[0];
            button.textContent="Voltar";
            button.style="background-color:#28a745;border-color: #1e7e34;";
        }
    }
}



class Expense{                                  //classe que armazena os dados inseridos
    constructor(year,month,day,type,description,eValue){
        this.year=year;
        this.month=month;
        this.day=day;
        this.type=type;
        this.description=description;
        this.eValue=eValue;
    }
    validate(){                                 //metodo que ira verificar se todos os dados foram preenchidos corretamente
        for(let i in this){                     //percorre cada um dos atributos do objeto
            if(this[i]==null || this[i]==undefined || this[i]==""){//verifica cada atributo
                return false;
            }
        }
        return true;
    }
}

/*Serao inseridos dois tipos de registro no local storage:um fixo e outro dinamico. O fixo, consiste em
 uma a chave de nome "id", que ira armazenar o valor da chave atual utilizada no registro dinamico,
 de modo que, esse valor sera incrementado para constituir(ser usado como chave) 
 no proximo registro dinamico*/


class Db{//classe que responsavel por inserir dados no local storage
    constructor(){
        let id=localStorage.getItem('id');          //ao instanciar o objeto, recupera a chave id
        if(id === null || id ==NaN || id ==="NaN"){/*se a chave ainda nao existir,
                                                    sera criada uma com o valor "0"*/
        localStorage.setItem('id',0)
        }
    }
    getNextId(){
        let id=localStorage.getItem('id');          //recupera a chave atual
        return parseInt(id)+1;                      //retorna a proxima
    }

    record(e){
        let id=this.getNextId();                   //recupera a proxima chave
        localStorage.setItem(id,JSON.stringify(e));//armazena  o objeto com a nova chave
        localStorage.setItem('id',id)              //estabelece nova chave como chave atual
    }
}

let db=new Db();



function register(){
    let year= document.getElementById('year')
    let month= document.getElementById('month')
    let day= document.getElementById('day')
    let type= document.getElementById('type')
    let description= document.getElementById('description')
    let eValue= document.getElementById('value')

    let expense = new Expense(
    year.value,
    month.value,
    day.value,
    type.value,
    description.value,
    eValue.value)

    console.log(expense);
    if(expense.validate()==true){
        db.record(expense);
        popUp(true);
    }
    else{
        popUp(false);
    }   
}