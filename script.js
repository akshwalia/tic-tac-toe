const boxes = document.querySelectorAll(".box");
let count=1;

const overlay = document.createElement('div');
const winnerDisplay = document.createElement('div');
const playagain = document.createElement('div');

//Module controlling the game 
const game = (() => {
    let array = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];


    function checkWin() {
        //Checking all the rows 
        for(let i=0; i<3; i++) {
            let crossCount = 0;
            let zeroCount = 0;
            for(let j=0; j<3; j++) {
                if(array[i][j] == 1) 
                    crossCount++;
                else if(array[i][j] == 0)
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
                if(array[j][i] == 1) 
                    crossCount++;
                else if(array[j][i] == 0)
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

    function revealWinner (res) {
        overlay.classList.add('overlay');
        winnerDisplay.classList.add('winnerDisplay');
        playagain.classList.add('playagain');
        playagain.textContent="Play Again?";

        if(res==1)
            winnerDisplay.textContent=`X has won the game`;
        else if(res==0)
            winnerDisplay.textContent="O has won the game";

        overlay.appendChild(winnerDisplay);
        overlay.appendChild(playagain);
        document.body.appendChild(overlay);

    }

    function addZero(e,row,col) {
        const zero = document.createElement('img');
        zero.src = "images/zero.png";
        zero.style.width="105px";
        zero.classList.add('zerocross');
        let id=e.target.id;
        const clickedBox = document.getElementById(`${id}`);
        clickedBox.appendChild(zero);

        array[row-1][col-1]=0;
    }

    function addCross(e,row,col) {
        const cross = document.createElement('img');
        cross.src='images/cross.png';
        cross.style.width="120px";
        cross.classList.add('zerocross');
        let id=e.target.id;
        const clickedBox = document.getElementById(`${id}`);
        clickedBox.appendChild(cross);

        array[row-1][col-1]=1;
    }

    function updateGame(e) {
        const row = Number(e.target.id.charAt(0));
        const col = Number(e.target.id.charAt(1));

        if(count%2==0)
            addZero(e,row,col);
        else    
            addCross(e,row,col);
        count++;

        if(count>5) {
            const res = checkWin();  
            if(res==1 || res==0)
                revealWinner(res);
        }
    }

    return {updateGame};
}) ();

function restart () {
    boxes.forEach(box => {
        box.innerHTML="";
    });
    overlay.remove();
    playagain.textContent="";
    count=1;
}
//Event Listener for the boxes
boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        game.updateGame(e);
    });
});

playagain.addEventListener('click',restart);