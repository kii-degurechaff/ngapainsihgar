const p1Button = document.querySelector("#p1-button");
const p1Display = document.querySelector("#p1-display");

const cursorBig = document.querySelector(".cursorBig");
const cursorSmall = document.querySelector(".cursorSmall");

const timerDisplay = document.querySelector("#timer-display");
const endText = document.querySelector("#end-text");

function saveData(){
  const dataUser = {
    username: document.getElementById('username').value,
    level: document.getElementById('level').value,
    gun:  document.querySelector('input[name="gun"]:checked').value,
    target: document.querySelector('input[name="target"]:checked').value,
  }

  localStorage.setItem(`dataUser`, JSON.stringify(dataUser));
  window.location.replace('index.html')
  alert('shoot to start!');
}

const containerWidth = 1000;
const containerHeight = 600;

const container = document.querySelector("#container-target");
container.style.position = "relative";
container.style.margin = "auto";

let targetImg = `${JSON.parse(localStorage.getItem('dataUser')).target}.png`;
p1Button.src = targetImg;

let gunImg = `${JSON.parse(localStorage.getItem('dataUser')).gun}.png`;
cursorBig.src = gunImg;

let username = JSON.parse(localStorage.getItem('dataUser')).username;

let level = JSON.parse(localStorage.getItem('dataUser')).level;
let defaultTimer = 30

if (level == 'easy'){
  defaultTimer = 30
}
else if (level == 'medium'){
  defaultTimer = 20
}
else if (level == 'hard') {
  defaultTimer = 15
}

timerDisplay.textContent = defaultTimer;

const positionElement = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursorSmall.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  cursorBig.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

let p1Score = 0;
let timerInterval = null;

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function realTimeTimer() {
  timerDisplay.textContent = defaultTimer;

  if (defaultTimer >= 0) {
    defaultTimer--;
  } else {
    clearInterval(timerInterval);
    if(confirm(`Time is Up! Your score was ${p1Score}, want to save your score?`)){
      localStorage.setItem(`${username}_point`, p1Score);
      window.location.replace('home.html');
    }else{
      window.location.replace('home.html');
    }
  }
}

p1Button.addEventListener("click", function () {
  p1Score += 1;
  p1Display.textContent = p1Score;

  if (!timerInterval) {
    timerInterval = setInterval(realTimeTimer, 1000);
  }

  const bangImage = document.createElement("img");
  bangImage.src = "boom.png";
  bangImage.style.position = "absolute";
  bangImage.style.zIndex = "1";

  bangImage.style.left = `${event.clientX - 45}px`;
  bangImage.style.top = `${event.clientY - 40}px`;

  document.body.appendChild(bangImage);

  setTimeout(() => {
    document.body.removeChild(bangImage);

    const containerRect = container.getBoundingClientRect();
    const containerLeftOffset = containerRect.left;
    const containerTopOffset = containerRect.top;

    const newLeft = getRandomPosition(containerWidth - p1Button.offsetWidth - 70) + containerLeftOffset;
    const newTop = getRandomPosition(containerHeight - p1Button.offsetHeight - 70) + containerTopOffset;

    p1Button.style.position = "absolute";
    p1Button.style.left = `${newLeft}px`;
    p1Button.style.top = `${newTop}px`;
  }, 200);
});

window.addEventListener("mousemove", positionElement);

const backButtonEl = document.querySelector('.back-btn')
backButtonEl.addEventListener('click', () => {
  window.location.replace('home.html')
})
