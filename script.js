//vars
const board = document.querySelector(".board");
const button = document.querySelector("button");
const root = document.documentElement;

let cells = [];
let cell_numbers;

//setup

window.addEventListener("DOMContentLoaded", drawBoard);
button.addEventListener("click",drawBoard);

//functions
function makeCells(number){
    let count = 0, i = 0, id = 0;

    if(number>80 || number <= 0 || !number || isNaN(number))return false;

    while (i<number){
        while (count < number && i < number){
            cells.push({id: id+1, x: count, y: i});
            id++;
            count++;
        }
        i++;
        count = 0;
    }
}


function fillBoard(cell){
    let display = cell.map(function(item){
        return `<div class="cell id${item.id}"></div>`; //with id for some reason
    });
    display = display.join("");
    board.innerHTML = display;
}

function drawing(cell){
    let background = cell.currentTarget.style.backgroundColor;
    if(background ==="white"){
    return cell.currentTarget.style.backgroundColor = `rgba(${rando(255)},${rando(255)},${rando(255)},0.1)`;
    }
    let background_str = background.replace(/[^0-9,.]/g,"");
    
    let array = background_str.split(",");
    if(array.length=4){ alpha = (parseFloat(array[3]))+.1;

    return cell.currentTarget.style.backgroundColor = `rgba(${array[0]},${array[1]},${array[2]},${alpha.toString()})`;
    }
}
// simple version
/* function drawing(cell){
    cell.currentTarget.style.backgroundColor = `black`;
} */


function clearBoard(){
    board.innerHTML = ``;
    cellElements = "";
    cells = [];
}

function drawBoard(){
    if(isNaN(cell_numbers)){
    cell_numbers = 4; //to not have an annoying prompt at every load
    } else {
        cell_numbers = prompt("Enter number of cells in a square")
    }
    clearBoard();
    if(makeCells(cell_numbers) == false)return console.log("Error");
    fillBoard(cells);
    
    let cellElements = document.querySelectorAll(".cell");
    
    cellElements.forEach(function(cell){
        cell.style.backgroundColor = "white";
        cell.addEventListener("mouseover",drawing)
    });
    root.style.setProperty("--cells-x",cell_numbers.toString());
    root.style.setProperty("--cell-size",(Math.floor(1024/(cell_numbers*2))).toString()+"px"); //not perfect, but I'm not that good with Math
}

function rando(input){
    return Math.floor(Math.random()*input);
}