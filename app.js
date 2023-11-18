let line  = 12;
let col = 30;
let generation = 0;
let stable = false;
let tab = [];
let previewTab = [];

const gameField = document.querySelector(".game-field");
const inputLigne = document.querySelector("#input-ligne");
const inputColonne = document.querySelector("#input-colonne");
const btnStart = document.querySelector('.btn-start');




btnStart.addEventListener('click', (e)=>{
    
   if(e.target.textContent == "Start"){
    stable = false;
    e.target.textContent = "Stop";
    e.target.style.backgroundColor = "red";
  startGame();

   }else{
    tab = [];
    stable = true;
    e.target.textContent = "Start";
    e.target.style.backgroundColor = "green";

   }
})



inputLigne.addEventListener("input", (e)=> {
    if(parseInt(e.target.value) > 1 && e.target.value != ''){
        line = parseInt(e.target.value);
        create();
    }
})

inputColonne.addEventListener("input", (e)=> {
    if(parseInt(e.target.value) > 1 && e.target.value != ''){
        
        col = parseInt(e.target.value);
        create();
    }
})


create();

function create(){
    gameField.innerHTML = '';
    tab = [];
    for (let index = 0; index < line; index++) {
        createLineOnGameField(index);
    }
}
    
function createButton(colonne,raw, div, colorBoolean){
    let but = document.createElement('button');
    but.style.height = "100%";
    but.style.width = `${100/col}%`;
    but.setAttribute('id', `but_${colonne.toString()+'_'+raw.toString()}`);
    but.setAttribute('valeur', 'false');
    div.appendChild(but);
    but.addEventListener("click", (e)=>{
        let value = e.target.getAttribute("valeur");
        console.log(e.target);
        // let id = e.target.id;
        e.target.setAttribute("valeur", value == "true" ? "false" : "true");
        e.target.style.backgroundColor = value == 'true' ? 'white' : 'black';
        // getNeighbors(parseInt(id.split('_')[2]), parseInt(id.split('_')[1]));
        
    })
}

function createLineOnGameField(raw){
    let div = document.createElement('div');
    div.style.width = "100%";
    div.style.height = `${100/line}%`;
    gameField.appendChild(div);
    for (let index = 0; index < col; index++) {
        let random = Math.floor(Math.random(10)*10);
       createButton(index, raw, div, random== 0 );
  
    }
}

function getNeighbors(ligne, colonne){
    let tableauNeighbors = [
        {
            ligne : ligne ,
            colonne : colonne + 1
        },
        {
            ligne : ligne ,
            colonne : colonne - 1
        },
        {
            ligne : ligne + 1 ,
            colonne : colonne
        },
        {
            ligne : ligne - 1 ,
            colonne : colonne
        },
        {
            ligne : ligne + 1 ,
            colonne : colonne - 1 
        },
        {
            ligne : ligne - 1,
            colonne : colonne - 1
        },
        {
            ligne : ligne - 1,
            colonne : colonne + 1
        },
        {
            ligne : ligne + 1 ,
            colonne : colonne + 1
        },
    ];
    let avalaibleNeighbor = 0;
    tableauNeighbors.forEach(element => {
       if(parseInt(element.colonne) < col && parseInt(element.colonne) >=0 && parseInt(element.ligne) < line && parseInt(element.ligne) >= 0){
            let but = document.querySelector(`#but_${element.colonne.toString()+'_'+element.ligne.toString()}`);
            // but.style.backgroundColor = 'red';
            let valeur = but.getAttribute('valeur');
            if(valeur == "true"){
                avalaibleNeighbor = avalaibleNeighbor + 1;
            }
        }
    });
     applyRuleGameLife(avalaibleNeighbor, ligne.toString(), colonne.toString());
    
}

function applyRuleGameLife(avalaibleNeighbor, raw, colonne){
    let but = document.querySelector(`#but_${colonne.toString()+'_'+raw.toString()}`);
    let valeur = but.getAttribute('valeur');
    if((valeur == "true" && (avalaibleNeighbor === 2 || avalaibleNeighbor === 3)) ){

        tab.push({
            raw : raw,
            col : colonne
        });
    }else if( valeur == "false" && avalaibleNeighbor === 3){
        tab.push({
                    raw : raw,
                    col : colonne
                });
    }
    
}

function getButtonsAndTest(){
    let buttons = document.querySelectorAll('.game-field button');
    buttons.forEach(element => {
        let raw = element.id.split("_")[2];
        let colonne = element.id.split("_")[1];
        getNeighbors(parseInt(raw), parseInt(colonne));
    });
    buttons.forEach(element => {
        element.style.backgroundColor = "white";
        element.setAttribute("valeur", "false");
    });


}

function getIncrement(tableau){
//    if(!comparerTableaux(tab, previewTab)){
    generation++;
    tableau.forEach(element => {
        let but = document.querySelector(`#but_${element.col.toString()+'_'+element.raw.toString()}`);
        but.style.backgroundColor = "black";
        but.setAttribute('valeur', "true");
    })
    // previewTab = tab;
//    }else{
//     stable = true;
//    }

}

function startGame(){
   let stu =  setInterval(() => {

        getButtonsAndTest();
        getIncrement(tab);
        tab = [];
        if(stable == true){
            clearInterval(stu);
        }
        console.log(generation);
    }, 1000);
}


function comparerTableaux(tableau1, tableau2) {
    if (tableau1.length !== tableau2.length) {
      return false;
    }
    tableau1.sort((a, b) => a.colonne - b.colonne || a.raw - b.raw);
    tableau2.sort((a, b) => a.colonne - b.colonne || a.raw - b.raw);
    for (let i = 0; i < tableau1.length; i++) {
      if (tableau1[i].colonne !== tableau2[i].colonne || tableau1[i].raw !== tableau2[i].raw) {
        return false;
      }
    }
    return true;
  }