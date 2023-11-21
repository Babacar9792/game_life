// import { tabCelluleToAlive } from "./declaration.js";
import { span } from "./declaration.js";
import { aliveToAlive, dieToAlive } from "./ruleOfGame.js";



export function createLine(container){
    for (let i = 0; i < 29; i++) {
        let div  = document.createElement('div');
        container.appendChild(div);
        createButton(div, i);
    }
}

export function createButton(div, ligne){
    for (let i = 0; i < 100; i++) {
        let button = document.createElement('button');
        button.setAttribute('active', 'false');
        button.setAttribute("id", `but_${ligne+'_'+i}`);
        div.appendChild(button);
        button.addEventListener('click', (e)=> {
            // let id = e.target.id;
            // getNeighbor(parseInt(id.split("_")[1]), parseInt(id.split("_")[2]))
            toggleActiveButton(e);
        });
    }
}

export function toggleActiveButton(e){
    let active = e.target.getAttribute("active");
  if(active == "false"){
      e.target.style.backgroundColor =   "black";
      e.target.setAttribute("active", 'true');
  }else{
    e.target.style.backgroundColor =   "white";
      e.target.setAttribute("active", 'false');
  }
}

export function randomCellule(){
    let buttons = document.querySelectorAll('.container button');

    buttons.forEach(element => {
        let rand = Math.floor(Math.random(10)*10);
        element.setAttribute("active", rand%7 == 0);
        element.style.backgroundColor = rand%7 == 0? "black" : "white"; 
    });
}

function    getNeighbor(row , col, tab){

    let tabNeighbor = [
        {
            row : row,
            col : col - 1
        },
        {
            row : row,
            col : col + 1
        },
        {
            row : row - 1,
            col : col
        },
        {
            row : row + 1,
            col : col
        },
        {
            row : row - 1,
            col : col - 1
        },
        {
            row : row - 1,
            col : col + 1
        },
        {
            row : row + 1,
            col : col - 1
        },
        {
            row : row + 1,
            col : col + 1
        }
    ];
    let activesNeighbor = 0;
    tabNeighbor.forEach(ele => {
        if(document.querySelector(`#but_${ele.row.toString()+'_'+ele.col.toString()}`)){
            let but = document.querySelector(`#but_${ele.row.toString()+'_'+ele.col.toString()}`);
            let active = but.getAttribute("active");
            activesNeighbor = active == "true" ? activesNeighbor + 1 : activesNeighbor;
        }
       
    })
    applyRule(activesNeighbor, row.toString(), col.toString(), tab);
}

export function canSurvive(tab){
    let buttons = document.querySelectorAll(".container button");
    buttons.forEach(button => {
        // let active = button.getAttribute("active");
        let id = button.id;
            getNeighbor(parseInt(id.split("_")[1]), parseInt(id.split("_")[2]), tab);
    });
}

function applyRule(activesNeighbor, row, col, tab){
    let button = document.querySelector(`#but_${row.toString()+'_'+col.toString()}`);
    let active = button.getAttribute("active");
    if(active == "true"){
        aliveToAlive(activesNeighbor, row, col, tab);
    }else{
        dieToAlive(activesNeighbor, row, col, tab);
    }
    
}

export function activeCellule(tableau){
    tableau.forEach(element => {
        let button = document.querySelector(`#but_${element.row.toString()+'_'+element.col.toString()}`);
        button.setAttribute("active", "true");
        button.style.backgroundColor = "black";
    })
}

export function reset(){
    let buttons = document.querySelectorAll('.container button');
    buttons.forEach(element => {
        element.setAttribute("active", "false");
        element.style.backgroundColor = "white";
    })
}

export function startGame(tab, generation){
        canSurvive(tab);
        reset();
        activeCellule(tab);
        getGeneration(generation);
        tab = [];
}


export function getGeneration(generation){
    span.textContent = generation.toString();
}

export function comparerTableaux(tableau1, tableau2) {
    if (tableau1.length !== tableau2.length) {
      return false;
    }
    let verificateur = 0;
    for (let i = 0; i < tableau1.length; i++) {
        if(tableau2.filter((el) => el.col == tableau1[i].col &&  el.row == tableau1[i].row ).length == 0){
            verificateur = verificateur + 1;
        }
    }
    return verificateur == 0 ? true : false;
  }

