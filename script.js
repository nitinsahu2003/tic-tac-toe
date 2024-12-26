let boxes = document.querySelectorAll(".box")
let msgContainer = document.querySelector(".msgContainer")
let msg = document.querySelector("#msg")
let scoreO = 0;
let scoreX = 0;

let turnO = true;

const winPattern = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [3,4,5],
    [6,7,8], [2,4,6]
]
const scoreOElement = document.getElementById("scoreO")
const scoreXElement = document.getElementById("scoreX")
function updateScore(winner){
    if(winner === "O"){
        scoreO++
        scoreOElement.textContent = scoreO
    }
    else if(winner === "X"){
        scoreX++
        scoreXElement.textContent = scoreX
    }
}
boxes.forEach((box) =>{
    box.addEventListener("click", ()=>{
        if(turnO === true){
            box.innerText = "O"
            turnO = false
        }
        else{
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true

        checkWinner()
    })
})

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
    }
}

const showWinner = (winner) =>{
    msg.innerText = `${winner} wins`
    msgContainer.classList.remove("hide")
    disableBoxes()
}

function resetGame(){
    setTimeout(() => {
        boxes.forEach(box =>{
            box.innerText = ""
            box.disabled = false
        })
        msgContainer.classList.add("hide");
        msg.innerText = "";
        turnO = true;
        winnerFound = false;
    }, 800);
}

let winnerFound = false


const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText
        let pos2 = boxes[pattern[1]].innerText
        let pos3 = boxes[pattern[2]].innerText 
        
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 ===pos3){
                showWinner(pos1)
                updateScore(pos1)
                winnerFound = true
                disableBoxes()
                resetGame()
            }
        }
        if(!winnerFound && [...boxes].every(box => box.textContent != "")){
            msg.innerText = "It's a draw"
            msgContainer.classList.remove("hide");
            resetGame()
        }
    }
}