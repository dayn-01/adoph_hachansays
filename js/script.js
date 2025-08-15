


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
    level = 0;
    levelCount.textContent = level;

    nextRound();
    document.getElementById("start-btn").disabled = true;
    document.getElementById("power-btn").disabled = false;
}

function overlayOn() {
  document.getElementById("overlay2").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay2").style.display = "none";
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
        highlightButton(sequence[i], 1);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableButtons();
        }
    }, 1250);
    overlayOff();
}

function handleClick(button) {
    if (powerOn) {
        const userColor = button.getAttribute("data-color");
        userSequence.push(Number(userColor));
        highlightButton(userColor, 0);
        if (!checkSequence()) {
            alert(`Game over! Press Start to retry! \nFINAL SCORE: ${level}`);
            togglePower();
            startGame();
        } else if (userSequence.length === sequence.length) {
            userSequence = [];
            level++;
            levelCount.textContent = level;
            showLevel(level + 1);
            overlayOn();
            
            setTimeout(() => nextRound(), 1000);
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
setInterval(newImage, 200);
}

function showLevel(currentCount) {
    StageTemp = `<div class=" mx-auto mb-4">
                                        <div class="portfolio-item mx-auto"  >
                                            <p style="font-size: 40px; color: white;"> Level `+currentCount+`</p>
                                        
                                        </div>
                                    </div>`;
            const boxProper = document.getElementById('level-show');  
            boxProper.innerHTML = StageTemp;
}

imageChange()
