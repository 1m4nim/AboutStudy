document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    let todoContent = '';
    if (params.has('content')) {
        todoContent += `内容: ${params.get('content')} \n`;
    }
    if (params.has('date')) {
        todoContent += `日付: ${params.get('date')} \n`;
    }
    if (params.has('predictionHours') || params.has('predictionMin')) {
        const predictionHours = params.get('predictionHours') || 0;
        const predictionMin = params.get('predictionMin') || 0;
        todoContent += `予想時間: ${predictionHours}時間 ${predictionMin}分\n`;
    }

    let completedContent = '';

    if (params.has('completed')) {
        completedContent += `やったこと: ${params.get('completed')}`;
    }
    if (params.has('completed_date')) {
        completedContent += `日付: ${params.get('completed_date')}`;
    }
    if (params.has('hours') || params.has('minutes')) {
        const hours = params.get('hours') || 0;
        const minutes = params.get('minutes') || 0;
        completedContent += `実際の時間: ${hours}時間 ${minutes}分`;
    }


    document.getElementById('todoContent').innerHTML = todoContent || 'データがありません';
    document.getElementById('completedContent').innerHTML = completedContent || 'データがありません';

    // 全て削除ボタンにイベントリスナーを追加
    document.getElementById('clearAllBtn').addEventListener('click', () => {
        // ローカルストレージから全てのデータを削除
        localStorage.removeItem('content');
        localStorage.removeItem('date');
        localStorage.removeItem('predictionHours');
        localStorage.removeItem('predictionMin');
        localStorage.removeItem('completed');
        localStorage.removeItem('completed_date');
        localStorage.removeItem('hours');
        localStorage.removeItem('minutes');

        // データが削除された後に表示を更新
        document.getElementById('todoContent').innerHTML = 'データがありません';
        document.getElementById('completedContent').innerHTML = 'データがありません';
    });
});


