const boxes = document.querySelectorAll(".box");
let i=1;



function addZero(e) {
    const zero = document.createElement('img');
    zero.src = "images/zero.png";
    zero.style.width="105px";
    zero.classList.add('zerocross');
    let id=e.target.id;
    const clickedBox = document.getElementById(`${id}`);
    clickedBox.appendChild(zero);
}

function addCross(e) {
    const cross = document.createElement('img');
    cross.src='images/cross.png';
    cross.style.width="120px";
    cross.classList.add('zerocross');
    let id=e.target.id;
    const clickedBox = document.getElementById(`${id}`);
    clickedBox.appendChild(cross);
}

boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        if(i%2==0)
            addZero(e);
        else    
            addCross(e);
        i++;
    });
});