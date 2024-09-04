document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    const btn2 = document.getElementById('btn2');
    const cont = document.getElementById('cont');
    const dateInput = document.getElementById('dateInput');
    const completedAction = document.getElementById('completedAction');
    const dateInput2 = document.getElementById('dateInput2');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');

    // 現在の日時を設定
    function setMinDateTime() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        dateInput2.setAttribute('min', today);
    }

    function handleClick() {
        const contentValue = cont.value.trim();
        const dateValue = dateInput.value;

        if (contentValue || dateValue) {
            let urlParams = new URLSearchParams();
            if (contentValue) urlParams.append('content', contentValue);
            if (dateValue) urlParams.append('date', dateValue);

            // 新しいページを開く
            window.open('newpage.html?' + urlParams.toString(), '_blank');

            // テキストフィールドと日付フィールドをクリア
            cont.value = '';
            dateInput.value = '';
        }
    }

    function handleCompletedAction() {
        const completedValue = completedAction.value.trim();
        const dateValue = dateInput2.value;
        const hoursValue = parseInt(hoursInput.value, 10) || 0;
        const minutesValue = parseInt(minutesInput.value, 10) || 0;

        if (completedValue || dateValue || (hoursValue > 0 || minutesValue > 0)) {
            let urlParams = new URLSearchParams();
            if (completedValue) urlParams.append('completed', completedValue);
            if (dateValue) urlParams.append('completed_date', dateValue); // dateとキーがかぶらないように修正
            if (hoursValue > 0) urlParams.append('hours', hoursValue);
            if (minutesValue > 0) urlParams.append('minutes', minutesValue);

            // 新しいページを開く
            window.open('newpage.html?' + urlParams.toString(), '_blank');

            // テキストフィールドと日付フィールドをクリア
            completedAction.value = '';
            dateInput2.value = '';
            hoursInput.value = '';
            minutesInput.value = '';
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('btn');
        const btn2 = document.getElementById('btn2');
        const cont = document.getElementById('cont');
        const dateInput = document.getElementById('dateInput');
        const completedAction = document.getElementById('completedAction');
        const dateInput2 = document.getElementById('dateInput2');
        const hoursInput = document.getElementById('hoursInput');
        const minutesInput = document.getElementById('minutesInput');

        function redirectToNewPage() {
            window.location.href = 'newpage.html';
        }

        function handleClick() {
            const contentValue = cont.value.trim();
            const dateValue = dateInput.value;

            if (contentValue || dateValue) {
                let displayText = contentValue ? `内容: ${contentValue}` : '';
                if (dateValue) {
                    displayText += `、日付: ${dateValue}`;
                }
                createListItem(displayText, contentList);

                // テキストフィールドと日付フィールドをクリア
                cont.value = '';
                dateInput.value = '';

                // データをローカルストレージに保存
                saveItems(contentList);

                // 新しいページにリダイレクト
                redirectToNewPage();
            }
        }

        function handleCompletedAction() {
            const completedValue = completedAction.value.trim();
            const dateValue = dateInput2.value;
            const hoursValue = parseInt(hoursInput.value, 10) || 0;
            const minutesValue = parseInt(minutesInput.value, 10) || 0;

            if (completedValue || dateValue || (hoursValue > 0 || minutesValue > 0)) {
                let displayText = completedValue ? `やったこと: ${completedValue}` : '';
                if (dateValue) {
                    displayText += `、日付: ${dateValue}`;
                }
                if (hoursValue > 0 || minutesValue > 0) {
                    displayText += `、時間: ${hoursValue}時間 ${minutesValue}分`;
                }
                createListItem(displayText, completedContentList);

                // テキストフィールドと日付フィールドをクリア
                completedAction.value = '';
                dateInput2.value = '';
                hoursInput.value = '';
                minutesInput.value = '';

                // データをローカルストレージに保存
                saveItems(completedContentList);

                // 新しいページにリダイレクト
                redirectToNewPage();
            }
        }

        // イベントリスナーをボタンに追加
        btn.addEventListener('click', handleClick);
        btn2.addEventListener('click', handleCompletedAction);
    });

    function submitForm() {
        const dateInput = document.getElementById('dateInput').value;
        const predictionHours = document.getElementById('predictionHours').value;
        const predictionMin = document.getElementById('predictionMin').value;
        const cont = document.getElementById('cont').value;

        const dateInput2 = document.getElementById('dateInput2').value;
        const hoursInput = document.getElementById('hoursInput').value;
        const minutesInput = document.getElementById('minutesInput').value;
        const completedAction = document.getElementById('completedAction').value;

        if (cont || dateInput || predictionHours || predictionMin || completedAction || dateInput2 || hoursInput || minutesInput) {
            localStorage.setItem('content', cont || localStorage.getItem('content'));
            localStorage.setItem('date', dateInput || localStorage.getItem('date'));
            localStorage.setItem('predictionHours', predictionHours || localStorage.getItem('predictionHours'));
            localStorage.setItem('predictionMin', predictionMin || localStorage.getItem('predictionMin'));
            localStorage.setItem('completed', completedAction || localStorage.getItem('completed'));
            localStorage.setItem('completed_date', dateInput2 || localStorage.getItem('completed_date'));
            localStorage.setItem('hours', hoursInput || localStorage.getItem('hours'));
            localStorage.setItem('minutes', minutesInput || localStorage.getItem('minutes'));

            // URL パラメータを作成
            let urlParams = new URLSearchParams();
            if (cont) urlParams.append('content', cont);
            if (dateInput) urlParams.append('date', dateInput);
            if (predictionHours) urlParams.append('predictionHours', predictionHours);
            if (predictionMin) urlParams.append('predictionMin', predictionMin);
            if (completedAction) urlParams.append('completed', completedAction);
            if (dateInput2) urlParams.append('completed_date', dateInput2);
            if (hoursInput) urlParams.append('hours', hoursInput);
            if (minutesInput) urlParams.append('minutes', minutesInput);

            // 新しいページを開く
            window.open('newpage.html?' + urlParams.toString(), '_blank');
        }
    }


    // ページ読み込み時に最小日時を設定
    setMinDateTime();
    btn.addEventListener('click', handleClick);
    btn2.addEventListener('click', handleCompletedAction);
});