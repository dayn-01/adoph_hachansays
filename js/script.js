


//actual game



const char1 = new Audio('sfx/simon_ado2.wav'); 
const char2 = new Audio('sfx/simon_naima.wav'); 
const char3 = new Audio('sfx/simon_migu.wav'); 
const char4 = new Audio('sfx/simon_ado.wav'); 


let powerOn = false;
const sequence = [];
let userSequence = [];
let level = 1;

const levelCount = document.querySelector('.level-count');

function startGame() {
    sequence.length = 0;
    userSequence.length = 0;
    level = 1;
    levelCount.textContent = level;
    nextRound();
    document.getElementById("start-btn").disabled = true;
    document.getElementById("power-btn").disabled = false;
}

function nextRound() {
    addToSequence();
    playSequence();
}

function addToSequence() {
    const randomColor = Math.floor(Math.random() * 4) + 1;
    sequence.push(randomColor);
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        highlightButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableButtons();
        }
    }, 1000);
}

function handleClick(button) {
    if (powerOn) {
        const userColor = button.getAttribute("data-color");
        userSequence.push(Number(userColor));
        highlightButton(userColor, 0);
        if (!checkSequence()) {
            alert(`Game over! Press Start to retry from level 1.\nFINAL SCORE: ${level - 1}`);
            togglePower();
            startGame();
        } else if (userSequence.length === sequence.length) {
            userSequence = [];
            level++;
            levelCount.textContent = level;
            /*Can change level as per convenience or if we want the game to 
            continue indefinitely, can omit if-else condition */
            if (level <= 20) {
                setTimeout(() => nextRound(), 1000);
            } else {
                alert("Congratulations! You won!");
                startGame();
            }
        }
    }
}

function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function highlightButton(color, tap = 1) {
    const button = document
    .querySelector(`[data-color="${color}"]`);
    if (Number(color) == 1) {
        if(tap == 1) {
            char1.play();   
        }
        button.style.backgroundColor = 'lightgreen'
    }
    else if (Number(color) == 2) {
        if(tap == 1) {
        char2.play();
        }
        button.style.backgroundColor = 'tomato'
    }
    else if (Number(color) == 3) {
        if(tap == 1) {
        char3.play();
        }
        button.style.backgroundColor = 'yellow'
    }
    else if (Number(color) == 4) {
        if(tap == 1) {
        char4.play();
        }
        button.style.backgroundColor = 'lightskyblue'
    }
    setTimeout(() => {
        button.attributes.removeNamedItem('style');
    }, 400);
}

function enableButtons() {
    const buttons = document
    .querySelectorAll('.simon-btn');
    buttons.forEach(button => 
    button.removeAttribute('disabled'));
}

function disableButtons() {
    const buttons = document
    .querySelectorAll('.simon-btn');
    buttons.forEach(button => 
    button.setAttribute('disabled', 'true'));
}

function toggleStrictMode() {
    strictMode = !strictMode;
}

function togglePower() {
    powerOn = !powerOn;
    if (powerOn) {
        startGame();
        enableButtons();
        document.getElementById("start-btn")
        .disabled = false;
    } else {
        userSequence = [];
        disableButtons();
        document.getElementById("start-btn")
        .disabled = true;
    }
}

// flying hachan lmao
var box = document.querySelector('.box');
var imageUrls = [
    "img/Flap-01.png",
    "img/Flap-02.png",
    "img/Flap-03.png",
];

var urlArrayLength = imageUrls.length;
function imageChange() {
    let index = 0;
    function newImage() {
        let image = imageUrls[index];
        Hachantemp = `<img style="height: 100px;"src="`+image+`" alt="..." /> <br>`
        const boxModal = document.getElementById('hachan_box');  
        boxModal.innerHTML = Hachantemp;
        index = (index + 1) % urlArrayLength;
    }

setInterval(newImage, 150);
}

imageChange()
