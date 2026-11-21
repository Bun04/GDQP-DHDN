(() => {
  const host = document.querySelector('#review-list');
  const summary = document.querySelector('#review-summary');
  let attempts = [];
  try { attempts = JSON.parse(localStorage.getItem('gdqp-quiz-attempts') || '[]'); } catch { /* corrupted local data */ }
  const id = new URLSearchParams(location.search).get('attempt');
  const attempt = attempts.find((item) => item.id === id);
  if (!attempt) { summary.innerHTML = '<p class="empty">Không tìm thấy kết quả trên trình duyệt này. Lịch sử chỉ lưu cục bộ trên thiết bị đã làm bài.</p>'; return; }
  summary.replaceChildren();
  const scoreOutOfTen = attempt.score / attempt.total * 10;
  const heading = document.createElement('h2'); heading.textContent = `${attempt.score}/${attempt.total} câu đúng · ${Math.round(attempt.score / attempt.total * 100)}% · ${Number(scoreOutOfTen.toFixed(2))}/10 điểm`;
  const date = document.createElement('p'); date.className = 'muted'; date.textContent = new Date(attempt.createdAt).toLocaleString('vi-VN');
  summary.append(heading, date);
  (attempt.questions || []).forEach((question, index) => {
    const item = document.createElement('article'); item.className = 'panel review-item';
    const title = document.createElement('h3'); title.textContent = `Câu ${index + 1}. ${question.question}`;
    const chapter = document.createElement('p'); chapter.className = 'muted'; chapter.textContent = `Chương ${question.chapter}`;
    const correct = question.selectedAnswer === question.correctAnswer;
    const result = document.createElement('p'); result.className = correct ? 'correct' : 'incorrect';
    result.textContent = correct ? `Bạn chọn ${question.selectedAnswer} · Chính xác` : `Bạn chọn ${question.selectedAnswer || 'chưa trả lời'} · Đáp án đúng: ${question.correctAnswer}`;
    const answer = document.createElement('p'); answer.textContent = `${question.correctAnswer}. ${question.options['ABCD'.indexOf(question.correctAnswer)]}`;
    item.append(title, chapter, result, answer); host.append(item);
  });
})();
