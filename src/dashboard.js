(async () => {
  const $ = (selector) => document.querySelector(selector);
  const readAttempts = () => { try { return JSON.parse(localStorage.getItem('gdqp-quiz-attempts') || '[]'); } catch { return []; } };
  try {
    const [questionResponse, chapterResponse] = await Promise.all([fetch('src/questions.json'), fetch('src/chapters.json')]);
    if (!questionResponse.ok || !chapterResponse.ok) throw new Error('Không tải được dữ liệu.');
    const [questions, chapters] = await Promise.all([questionResponse.json(), chapterResponse.json()]);
    $('#question-total').textContent = questions.length;
    $('#chapter-total').textContent = chapters.length;
    const attempts = readAttempts();
    $('#attempt-total').textContent = attempts.length;
    const chapterHost = $('#home-chapters'); chapterHost.replaceChildren();
    chapters.slice(0, 3).forEach((chapter) => {
      const count = questions.filter((question) => question.chapter === chapter.id).length;
      const card = document.createElement('article'); card.className = 'panel chapter-card';
      const title = document.createElement('h3'); title.textContent = `Chương ${chapter.id}: ${chapter.title}`;
      const description = document.createElement('p'); description.textContent = `${count} câu hỏi`;
      const link = document.createElement('a'); link.className = 'button outline'; link.href = `pages/quiz/?chapter=${chapter.id}`; link.textContent = 'Luyện chương này';
      card.append(title, description, link); chapterHost.append(card);
    });
    const recent = $('#recent-attempts'); recent.replaceChildren();
    if (!attempts.length) { const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'Chưa có lượt làm bài. Kết quả sẽ xuất hiện ở đây.'; recent.append(empty); }
    attempts.slice(0, 3).forEach((attempt) => {
      const row = document.createElement('article'); row.className = 'row-item';
      const info = document.createElement('div'); const title = document.createElement('h3'); title.textContent = `${attempt.score}/${attempt.total} câu đúng`;
      const date = document.createElement('p'); date.textContent = new Date(attempt.createdAt).toLocaleString('vi-VN'); info.append(title, date);
      const link = document.createElement('a'); link.className = 'button outline'; link.href = `pages/answer-review/?attempt=${encodeURIComponent(attempt.id)}`; link.textContent = 'Xem lại';
      row.append(info, link); recent.append(row);
    });
  } catch (error) { $('#home-chapters').textContent = error.message; }
})();
