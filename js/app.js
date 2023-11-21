import {btnStart, container, btnRandom, btnReset} from './declaration.js'
import {  createLine, randomCellule, startGame, reset, comparerTableaux } from './function.js';


// container.style.backgroundColor = 'red';
let tabCelluleToAlive = [];
let stopNoGeneration = false;
let previewStep = [];
let generation = 0;

createLine(container);
btnStart.addEventListener('click', ()=> {
    if(!btnStart.classList.contains('start')){
        btnStart.classList.add('start');
        btnStart.style.backgroundColor = "green";
        btnStart.textContent = "Start";
        stopNoGeneration = true;

    }else{
        btnStart.style.backgroundColor = "red";
        btnStart.textContent = "Stop";
        btnStart.classList.remove('start');
        stopNoGeneration = false;
        let interval = setInterval(() => {
            startGame(tabCelluleToAlive, generation);
            generation = generation + 1;
            if(stopNoGeneration || comparerTableaux(previewStep, tabCelluleToAlive)){
                clearInterval(interval);
            }
            previewStep = tabCelluleToAlive;
            tabCelluleToAlive = [];
            
           
           }, 100);
    }
  
});

btnReset.addEventListener("click", ()=> {
    btnStart.classList.add('start');
    btnStart.style.backgroundColor = "green";
    btnStart.textContent = "Start";
    stopNoGeneration = true;
    generation = 0;
    reset();

});
btnRandom.addEventListener("click", ()=> {
    stopNoGeneration = true;
    randomCellule();
    generation = 0;
});
