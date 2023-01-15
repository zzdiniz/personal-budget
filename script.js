
function popUp(){
    console.log("Clique efetuado");
    let blur=document.getElementById("blur");
    let popUp=document.getElementById("pop-up");

    if(popUp.className!=="" || popUp.className){
        popUp.className="";
        blur.className="";
        blur.style="display:none;";
    }
    else{
        popUp.className="active";
        blur.className="active"; 
        blur.style="display:block;";
    }
}