let boxes = document.querySelectorAll(".boxes");
let reset_btn = document.querySelector("#reset_btn");
let msg_container = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let new_game = document.querySelector("#new_game");

let clickcount = 0;
winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let turnO = true;

const reset_game = () => {
    turnO = true;
    clickcount=0;
    enableBoxes();
    msg_container.classList.add("hide");
}

const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = ""
    }
}

const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `The Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "It's a Draw!! Well Played.";
    msg_container.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(pattern of winPattern){
        let val0 = boxes[pattern[0]].innerText;
        let val1 = boxes[pattern[1]].innerText;
        let val2 = boxes[pattern[2]].innerText;

        let win = false;
        if(val0 != "" && val1 != "" && val2 != ""){
            if(val0 === val1 && val1 === val2){
                win = true;
                showWinner(val1);
            }
            else{
                if(clickcount===9 && !win){
                    showDraw();
                }
            }
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener('click', ()=>{
        ++clickcount;
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    })
});


reset_btn.addEventListener('click', reset_game);
new_game.addEventListener('click', reset_game);