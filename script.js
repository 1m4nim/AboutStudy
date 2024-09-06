//送信するときの挙動を考える

// やることの送信ボタン
document.getElementById('btn').addEventListener('click', function () {
    const dateInput = document.getElementById('dateInput').value;
    const predictionHours = document.getElementById('predictionHours').value;
    const predictionMin = document.getElementById('predictionMin').value;
    const cont = document.getElementById('cont').value;

    btn.addEventListener("click", function (e) {
        e.preventDefault();
        log.innerHTML = `${btn.value}`;
    })


    // 入力データをlocalStorageに保存
    localStorage.setItem('todoDate', dateInput);
    localStorage.setItem('predictionHours', predictionHours);
    localStorage.setItem('predictionMin', predictionMin);
    localStorage.setItem('todoContent', cont);

    window.open("newpage.html", "_blank");

});


// やったことの送信ボタン
document.getElementById('btn2').addEventListener('click', function () {
    const dateInput2 = document.getElementById('dateInput2').value;
    const hoursInput = document.getElementById('hoursInput').value;
    const minutesInput = document.getElementById('minutesInput').value;
    const completedAction = document.getElementById('completedAction').value;

    // 入力データをlocalStorageに保存
    localStorage.setItem('doneDate', dateInput2);
    localStorage.setItem('doneHours', hoursInput);
    localStorage.setItem('doneMinutes', minutesInput);
    localStorage.setItem('completedAction', completedAction);


    let btn = document.getElementById("btn");
    let btn2 = document.getElementById("btn2");


    btn2.addEventListener("click", function (e) {
        e.preventDefault();
        log.innerHTML = `${btn2.value}`
    })

    // newpage.htmlへ移動
    window.open("newpage.html", "_blank");
});
