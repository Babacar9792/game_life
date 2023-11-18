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
const span = document.querySelector("span");

const tab1 = [
    {col : 0, line : 5},
    {col : 0, line : 1},
    {col : 0, line : 3},

];

const tab2 = [
    {col : 0, line : 2},
    {col : 0, line : 1},
    {col : 0, line : 3},

]



// console.log("compare",comparerTableaux(tab1, tab2));
create();
span.textContent = generation.toString();



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
    but.addEventListener("mouseenter", (e)=>{
        let value = e.target.getAttribute("valeur");
        console.log(e.target);
        e.target.setAttribute("valeur", value == "true" ? "false" : "true");
        e.target.style.backgroundColor = value == 'true' ? 'white' : 'black';
        
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
    // console.log("wou");


}

function getIncrement(tableau){
tableau.forEach(element => {
    let but = document.querySelector(`#but_${element.col.toString()+'_'+element.raw.toString()}`);
    but.style.backgroundColor = "black";
    but.setAttribute('valeur', "true");
})

// if(comparerTableaux(tableau, previewTab) == true){
//     stable = true;
//     console.log("true");
// }else{

   
//     stable = false;
    
// }
generation++;
span.textContent = generation.toString();

}

function startGame(){
   let stu =  setInterval(() => {
    // console.log("wou");
        getButtonsAndTest();
        getIncrement(tab);
        // console.log("preview : ",previewTab);
        // console.log("tab : ",tab);
        if(stable == true){
            // generation = generation - 1 
            // span.textContent = generation.toString();
            clearInterval(stu);
        }
        previewTab = tab;
       
       
        tab = [];
        
    }, 1000);
}


function comparerTableaux(tableau1, tableau2) {
    if (tableau1.length !== tableau2.length) {
      return false;
    }
    let verificateur = 0;
    for (let i = 0; i < tableau1.length; i++) {
        // console.log(tableau2.filter(el => el.col == tableau1[i].col &&  el.line == tableau1[i].line));
        if(tableau2.filter((el) => el.col == tableau1[i].col &&  el.line == tableau1[i].line ).length == 0){
            verificateur = verificateur + 1;
        }
    }
    console.log(verificateur);
    return verificateur == 0 ? true : false;
  }