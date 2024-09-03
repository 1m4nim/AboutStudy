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

    // ページ読み込み時に最小日時を設定
    setMinDateTime();

    btn.addEventListener('click', handleClick);
    btn2.addEventListener('click', handleCompletedAction);
});
