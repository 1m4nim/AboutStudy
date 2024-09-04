
// URLパラメータを取得して表示
const params = new URLSearchParams(window.location.search);

// "やること"に関連する内容
let todoContent = '';
if (params.has('content')) {
    todoContent += `内容: ${params.get('content')}<br>`;
}
if (params.has('date')) {
    todoContent += `日付: ${params.get('date')}<br>`;
}

// "やったこと"に関連する内容
let completedContent = '';
if (params.has('completed')) {
    completedContent += `やったこと: ${params.get('completed')}<br>`;
}
if (params.has('completed_date')) {
    completedContent += `日付: ${params.get('completed_date')}<br>`;
}
if (params.has('hours') || params.has('minutes')) {
    const hours = params.get('hours') || 0;
    const minutes = params.get('minutes') || 0;
    completedContent += `時間: ${hours}時間 ${minutes}分<br>`;
}

// 各セクションにデータを表示
document.getElementById('todoContent').innerHTML = todoContent || 'データがありません';
document.getElementById('completedContent').innerHTML = completedContent || 'データがありません';