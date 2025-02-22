const timerDisplay = document.querySelector(".timer");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const statusMessage = document.getElementById("status");
const alarm = document.getElementById("alarm");

let timer;
let time;
let isRunning = false;

// Detect the page type and set the timer accordingly
const pageTitle = document.querySelector(".timertext")?.textContent.toLowerCase();

if (pageTitle.includes("soft")) {
    time = 180; // 3 minutes
} else if (pageTitle.includes("medium")) {
    time = 300; // 5 minutes
} else if (pageTitle.includes("hard")) {
    time = 420; // 7 minutes
} else {
    time = 180; // Default to soft boiled
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(time);
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startPauseButton.textContent = "Pause";
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                startPauseButton.textContent = "Start";
                statusMessage.classList.remove("hidden");
                alarm.play();
            }
        }, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        startPauseButton.textContent = "Resume";
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startPauseButton.textContent = "Start";
    statusMessage.classList.add("hidden");

    // Reset the timer to the correct time based on the page
    if (pageTitle.includes("soft")) {
        time = 180;
    } else if (pageTitle.includes("medium")) {
        time = 300;
    } else if (pageTitle.includes("hard")) {
        time = 420;
    }

    updateDisplay();
}

// Attach event listeners
startPauseButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
