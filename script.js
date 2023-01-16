
function popUp(x){                               //controle do popUp lancado ao cadastrar um novo registro
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
            if(this[i]==null || this[i]==undefined || this[i]==""){
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
        /*"stringify"  transforma objeto literal recebido como parametro
        em string no formato JSON para ser incluida no local storage*/
        localStorage.setItem(id,JSON.stringify(e));//armazena  o objeto com a nova chave
        localStorage.setItem('id',id)              //estabelece nova chave como chave atual
    }
    retrieveRegisters(){
        let id=localStorage.getItem('id');
        let expenses=Array();                            //array que ira armazenar as despesas
        for(let i=1;i<=id;i++){                    //percorre todos os registros de local storage
            /*recupera despesa covertendo de string JSON para objeto literal*/
            let expense=JSON.parse(localStorage.getItem(i));
            console.log(i,expense);
            /*let x={
                year:expense.year,
                month:expense.month
            }*/
            expenses.push(expense);
            
        } 
        console.log(expenses);                                                                      
    }
}

let db=new Db();



function register(){
    /*Recuperando valores do DOM */
    let year= document.getElementById('year')
    let month= document.getElementById('month')
    let day= document.getElementById('day')
    let type= document.getElementById('type')
    let description= document.getElementById('description')
    let eValue= document.getElementById('value')
    /*Criando objeto literal com os valores recebidos */
    let expense = new Expense(
    year.value,
    month.value,
    day.value,
    type.value,
    description.value,
    eValue.value)

    if(expense.validate()==true){
        db.record(expense);         //cadastrando objeto 
        popUp(true);
        console.log("Cadastrado com sucesso!");
    }
    else{
        popUp(false);
        console.log("Cadastro invalido")
    }   
}


function loadExpenses(){
    db.retrieveRegisters();
}