(() => {
  const key = 'gdqp-quiz-attempts';
  const read = () => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
  const host = document.querySelector('#history-list');
  const render = () => {
    const attempts = read();
    document.querySelector('#attempt-count').textContent = attempts.length;
    const avg = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + item.score / item.total, 0) / attempts.length * 100) : null;
    const best = attempts.length ? Math.max(...attempts.map((item) => Math.round(item.score / item.total * 100))) : null;
    document.querySelector('#average-score').textContent = avg === null ? '—' : `${avg}%`;
    document.querySelector('#best-score').textContent = best === null ? '—' : `${best}%`;
    host.replaceChildren();
    if (!attempts.length) { const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'Chưa có lượt làm bài nào trên trình duyệt này.'; host.append(empty); return; }
    attempts.forEach((attempt) => {
      const row = document.createElement('article'); row.className = 'row-item';
      const info = document.createElement('div'); const title = document.createElement('h3'); title.textContent = `${attempt.score}/${attempt.total} câu đúng · ${Math.round(attempt.score / attempt.total * 100)}%`;
      const date = document.createElement('p'); date.textContent = new Date(attempt.createdAt).toLocaleString('vi-VN'); info.append(title, date);
      const link = document.createElement('a'); link.className = 'button outline'; link.href = `../answer-review/?attempt=${encodeURIComponent(attempt.id)}`; link.textContent = 'Xem lại đáp án';
      row.append(info, link); host.append(row);
    });
  };
  document.querySelector('#clear-history').addEventListener('click', async () => {
    if (!read().length) return;
    const confirmed = await window.appConfirm({
      title: 'Xóa lịch sử làm bài?',
      message: 'Thao tác này sẽ xóa toàn bộ kết quả đã lưu trên trình duyệt này.',
      confirmText: 'Xóa lịch sử',
      cancelText: 'Giữ lại',
      danger: true
    });
    if (!confirmed) return;
    localStorage.removeItem(key); render();
  });
  render();
})();


