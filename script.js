const startgame = document.getElementById('startgamebutton');
const startOverlay = document.querySelector('.startPage');
const playeronename = document.getElementById('playeronename');
const playertwoname = document.getElementById('playertwoname');

const boxes = document.querySelectorAll(".box");
let count=1;

const badges = document.querySelector('.badges');
let playerone;
let playertwo;

let firstBadge;
let secondBadge;

const overlay = document.createElement('div');
const winnerDisplay = document.createElement('div');
const playagain = document.createElement('div');

const player = (name) => {
    return {name};
}

let array = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

//Module controlling the game 
const game = (() => {

    //Checking if someone has one yet
    function checkWin() {
        //Checking all the rows 
        for(let i=0; i<3; i++) {
            let crossCount = 0;
            let zeroCount = 0;
            for(let j=0; j<3; j++) {
                if(array[i][j] === 1) 
                    crossCount++;
                else if(array[i][j] === 0)
                    zeroCount++;
                else 
                    break;
            }
            if(crossCount==3)
                return 1;
            else if(zeroCount==3)
                return 0;
        }

        //Checking all the columns
        for(let i=0; i<3; i++) {
            let crossCount = 0;
            let zeroCount = 0;
            for(let j=0; j<3; j++) {
                if(array[j][i] === 1) 
                    crossCount++;
                else if(array[j][i] === 0)
                    zeroCount++;
                else 
                    break;
            }
            if(crossCount==3)
                return 1;
            else if(zeroCount==3)
                return 0;
        }

        if(array[0][0]==array[1][1] && array[0][0]==array[2][2] && array[0][0]==1)
            return 1;
        else if(array[0][0]==array[1][1] && array[0][0]==array[2][2] && array[0][0]==0)
            return 0;
        
        if(array[0][2]==array[1][1] && array[0][2]==array[2][0] && array[0][2]==1)
            return 1;
        else if(array[0][2]==array[1][1] && array[0][2]==array[2][0] && array[0][2]==0)
            return 0;

        return -1;    //if no one has won 
    }

    //Displays the winner on the screen
    function revealWinner (res) {
        overlay.classList.add('overlay');
        winnerDisplay.classList.add('winnerDisplay');
        playagain.classList.add('playagain');
        playagain.textContent="Play Again?";

        if(res==1) {
            winnerDisplay.textContent=`${playerone.name} has won the game`;
        }
        else if(res==0) {
            winnerDisplay.textContent=`${playertwo.name} has won the game`;
        }
        else {
            winnerDisplay.textContent="It is a draw";
        }

        overlay.appendChild(winnerDisplay);
        overlay.appendChild(playagain);
        document.body.appendChild(overlay);

    }

    //Displays zero on the clicked box
    function addZero(e,row,col) {
        if(array[row-1][col-1] === -1) {
            const zero = document.createElement('img');
            zero.src = "images/zero.png";
            zero.style.width="105px";
            zero.classList.add('zerocross');
            let id=e.target.id;
            const clickedBox = document.getElementById(`${id}`);
            clickedBox.appendChild(zero);

            array[row-1][col-1]=0;
            firstBadge.classList.add('turntoplay');
            secondBadge.classList.remove('turntoplay');
            count++;
        }
    }

    //Displays cross on the clicked box
    function addCross(e,row,col) {
        if(array[row-1][col-1] === -1) {
            const cross = document.createElement('img');
            cross.src='images/cross.png';
            cross.style.width="120px";
            cross.classList.add('zerocross');
            let id=e.target.id;
            const clickedBox = document.getElementById(`${id}`);
            clickedBox.appendChild(cross);

            array[row-1][col-1]=1;
            firstBadge.classList.remove('turntoplay');
            secondBadge.classList.add('turntoplay');
            count++;
        }
        
    }

    //Control function
    function updateGame(e) {
        const row = Number(e.target.id.charAt(0));
        const col = Number(e.target.id.charAt(1));

        if(count%2==0)
            addZero(e,row,col);
        else    
            addCross(e,row,col);
        

        if(count>5) {
            const res = checkWin();  
            if(res==1 || res==0 || count==10)
                revealWinner(res);
        }
    }

    return {array,updateGame};
}) ();

function restart () {
    boxes.forEach(box => {
        box.innerHTML="";
    });
    overlay.remove();
    
    firstBadge.classList.add('turntoplay');
    secondBadge.classList.remove('turntoplay');
    playagain.textContent="";
    count=1;
    array = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
}

function displayBadges() {
    firstBadge = document.createElement('div');
    secondBadge = document.createElement('div');

    firstBadge.textContent = playerone.name;
    secondBadge.textContent = playertwo.name;

    firstBadge.classList.add('playerbadge');
    secondBadge.classList.add('playerbadge');
    firstBadge.classList.add('turntoplay')

    badges.appendChild(firstBadge);
    badges.appendChild(secondBadge);
}
//Event Listener for the boxes
boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        game.updateGame(e);
    });
});

startgame.addEventListener('click', (e) => {
    e.preventDefault();

    playerone = player(playeronename.value);
    playertwo = player(playertwoname.value);
    

    displayBadges();
    startOverlay.remove();
});

playagain.addEventListener('click',restart);