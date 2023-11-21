export function aliveToAlive(activesNeighbor, row, col, tab){
    if(activesNeighbor === 2 || activesNeighbor === 3){
        tab.push({
            row : row,
            col : col
        });
    }
}

export function dieToAlive(activesNeighbor, row, col, tab){
    if(activesNeighbor === 3){
        tab.push({
            row : row,
            col : col
        });
    }
}