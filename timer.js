// timer.js

document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    let startTime;
    let timerInterval;

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000); // 1秒ごとにタイマーを更新
        startBtn.disabled = true; // スタートボタンを無効にする
        stopBtn.disabled = false; // ストップボタンを有効にする
    }

    function stopTimer() {
        clearInterval(timerInterval); // タイマーを停止する
        startBtn.disabled = false; // スタートボタンを再度有効にする
        stopBtn.disabled = true; // ストップボタンを無効にする
    }

    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');

        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    startBtn.addEventListener('click', startTimer); // スタートボタンがクリックされたときにタイマーを開始
    stopBtn.addEventListener('click', stopTimer); // ストップボタンがクリックされたときにタイマーを停止
});
