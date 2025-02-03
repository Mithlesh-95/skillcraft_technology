document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.querySelector('.time-display');
    const startStopBtn = document.getElementById('startStop');
    const lapBtn = document.getElementById('lap');
    const resetBtn = document.getElementById('reset');
    const lapsContainer = document.getElementById('laps');
    const lapsList = document.querySelector('.laps-list');

    let time = 0;
    let isRunning = false;
    let intervalId = null;

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const updateDisplay = () => {
        timeDisplay.textContent = formatTime(time);
    };

    const toggleStartStop = () => {
        isRunning = !isRunning;
        if (isRunning) {
            intervalId = setInterval(() => {
                time += 10;
                updateDisplay();
            }, 10);
            startStopBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                    <rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                Pause
            `;
            startStopBtn.classList.add('running');
            lapBtn.disabled = false;
        } else {
            clearInterval(intervalId);
            startStopBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Start
            `;
            startStopBtn.classList.remove('running');
            lapBtn.disabled = true;
        }
    };

    const reset = () => {
        isRunning = false;
        clearInterval(intervalId);
        time = 0;
        updateDisplay();
        startStopBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Start
        `;
        startStopBtn.classList.remove('running');
        lapBtn.disabled = true;
        lapsContainer.classList.add('hidden');
        lapsList.innerHTML = '';
    };

    const addLap = () => {
        lapsContainer.classList.remove('hidden');
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        const lapNumber = document.createElement('span');
        lapNumber.className = 'lap-number';
        const lapTime = document.createElement('span');
        lapTime.className = 'lap-time';
        
        const currentLaps = lapsList.children.length;
        lapNumber.textContent = `Lap ${currentLaps + 1}`;
        lapTime.textContent = formatTime(time);
        
        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTime);
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    };

    startStopBtn.addEventListener('click', toggleStartStop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', addLap);
});