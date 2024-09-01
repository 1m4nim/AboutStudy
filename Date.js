document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    const sortBtn = document.getElementById('sortBtn');
    const contentList = document.getElementById('contentList');
    const cont = document.getElementById('cont');
    const dateInput = document.getElementById('dateInput');
    const completedAction = document.getElementById('completedAction');
    const dateInput2 = document.getElementById('dateInput2');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const btn2 = document.getElementById('btn2');
    const completedContentList = document.getElementById('completedContentList');

    // 現在の日時を設定
    function setMinDateTime() {
        const now = new Date();
        const today = now.toISOString().split('T')[0]; // YYYY-MM-DD形式

        dateInput.setAttribute('min', today);
        dateInput2.setAttribute('min', today);
    }

    // ローカルストレージからデータを読み込み、リストを更新
    function loadContent() {
        const savedItems = JSON.parse(localStorage.getItem('contentList')) || [];
        contentList.innerHTML = '';
        savedItems.forEach(item => {
            createListItem(item, contentList);
        });

        const completedItems = JSON.parse(localStorage.getItem('completedContentList')) || [];
        completedContentList.innerHTML = '';
        completedItems.forEach(item => {
            createListItem(item, completedContentList);
        });
    }

    // データをローカルストレージに保存
    function saveContent(listId, items) {
        localStorage.setItem(listId, JSON.stringify(items));
    }

    // リストアイテムを作成する関数
    function createListItem(text, list) {
        const listItem = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = function () {
            listItem.remove();
            saveItems(list);
        };

        listItem.textContent = text;
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    }

    function saveItems(list) {
        const items = [];
        list.querySelectorAll('li').forEach(item => {
            items.push(item.textContent.replace('削除', '').trim());
        });
        if (list === contentList) {
            saveContent('contentList', items);
        } else {
            saveContent('completedContentList', items);
        }
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
        }
    }

    function sortContent(list, listId) {
        const items = Array.from(list.querySelectorAll('li'));
        items.sort((a, b) => {
            const dateA = a.textContent.match(/日付: (\d{4}-\d{2}-\d{2})/);
            const dateB = b.textContent.match(/日付: (\d{4}-\d{2}-\d{2})/);
            if (dateA && dateB) {
                return new Date(dateA[1]) - new Date(dateB[1]);
            }
            return 0;
        });
        list.innerHTML = '';
        items.forEach(item => list.appendChild(item));
        saveContent(listId, items.map(item => item.textContent.trim()));
    }

    // ページ読み込み時に最小日時を設定
    setMinDateTime();

    btn.addEventListener('click', handleClick);
    btn2.addEventListener('click', handleCompletedAction);
    sortBtn.addEventListener('click', () => sortContent(contentList, 'contentList'));
    sortBtn2.addEventListener('click', () => sortContent(completedContentList, 'completedContentList'));

    // ページ読み込み時にデータを読み込む
    loadContent();
});
