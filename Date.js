document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    const sortBtn = document.getElementById('sortBtn');
    const contentList = document.getElementById('contentList');
    const cont = document.getElementById('cont');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');

    // 現在の日時を設定
    function setMinDateTime() {
        const now = new Date();
        const today = now.toISOString().split('T')[0]; // YYYY-MM-DD形式
        const timeNow = now.toTimeString().split(' ')[0].slice(0, 5); // HH:MM形式

        dateInput.setAttribute('min', today);

        // 同日の場合に時間制限を設ける
        dateInput.addEventListener('change', () => {
            if (dateInput.value === today) {
                timeInput.setAttribute('min', timeNow);
            } else {
                timeInput.removeAttribute('min');
            }
        });

        // ページ読み込み時に日付が現在の日付であれば時間の最小値も設定
        if (dateInput.value === today) {
            timeInput.setAttribute('min', timeNow);
        }
    }

    // ローカルストレージからデータを読み込み、リストを更新
    function loadContent() {
        const savedItems = JSON.parse(localStorage.getItem('contentList')) || [];
        contentList.innerHTML = '';
        savedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            contentList.appendChild(listItem);
        });
    }

    // データをローカルストレージに保存
    function saveContent() {
        const items = [];
        contentList.querySelectorAll('li').forEach(item => {
            items.push(item.textContent);
        });
        localStorage.setItem('contentList', JSON.stringify(items));
    }

    function handleClick() {
        const contentValue = cont.value.trim();
        const dateValue = dateInput.value;
        const timeValue = timeInput.value;

        if (contentValue || dateValue || timeValue) {
            const listItem = document.createElement('li');
            let displayText = contentValue ? `内容: ${contentValue}` : '';
            if (dateValue) {
                displayText += `、日付: ${dateValue}`;
            }
            if (timeValue) {
                displayText += `、時間: ${timeValue}`;
            }
            listItem.textContent = displayText;
            contentList.appendChild(listItem);

            // テキストフィールドと日付・時間フィールドをクリア
            cont.value = '';
            dateInput.value = '';
            timeInput.value = '';

            // データをローカルストレージに保存
            saveContent();
        }
    }

    function sortContent() {
        const items = Array.from(contentList.querySelectorAll('li'));
        items.sort((a, b) => {
            const dateA = a.textContent.match(/日付: (\d{4}-\d{2}-\d{2})/);
            const dateB = b.textContent.match(/日付: (\d{4}-\d{2}-\d{2})/);
            if (dateA && dateB) {
                return new Date(dateA[1]) - new Date(dateB[1]);
            }
            return 0;
        });
        contentList.innerHTML = '';
        items.forEach(item => contentList.appendChild(item));
        saveContent(); // ソート後も保存
    }

    // ページ読み込み時に最小日時を設定
    setMinDateTime();

    btn.addEventListener('click', handleClick);
    sortBtn.addEventListener('click', sortContent);

    // ページ読み込み時にデータを読み込む
    loadContent();
});
