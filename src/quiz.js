(() => {
  const state = { questions: [], chapters: [], active: [], index: 0, answers: new Map(), flagged: new Set(), seconds: 0, timerId: null };
  const $ = (selector) => document.querySelector(selector);
  const letters = ['A', 'B', 'C', 'D'];

  const escapeText = (value) => String(value ?? '');
  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const chapterTitle = (chapterId) => state.chapters.find((chapter) => chapter.id === chapterId)?.title ?? `Chương ${chapterId}`;

  async function loadBank() {
    try {
      const [questionsResponse, chaptersResponse] = await Promise.all([
        fetch('../../src/questions.json'),
        fetch('../../src/chapters.json')
      ]);
      if (!questionsResponse.ok || !chaptersResponse.ok) throw new Error('Không tải được file dữ liệu.');
      const [questions, chapters] = await Promise.all([questionsResponse.json(), chaptersResponse.json()]);
      if (!Array.isArray(questions) || !questions.length || !Array.isArray(chapters)) throw new Error('Dữ liệu câu hỏi không đúng định dạng.');
      state.questions = questions.filter((question) => question.question && Array.isArray(question.options) && question.options.length === 4 && letters.includes(question.answer));
      state.chapters = chapters;
      if (!state.questions.length) throw new Error('Không tìm thấy câu hỏi hợp lệ.');
      populateChapterSelect();
      $('#load-status').textContent = `Đã tải ${state.questions.length} câu hỏi thuộc ${state.chapters.length} chương.`;
      $('#setup-panel').hidden = false;
      updateAvailableCount();
    } catch (error) {
      $('#load-status').textContent = `${error.message} Hãy chạy trang qua máy chủ tĩnh (không mở file trực tiếp).`;
      $('#load-status').classList.add('error-text');
    }
  }

  function populateChapterSelect() {
    const select = $('#chapter-select');
    state.chapters.forEach((chapter) => {
      const option = document.createElement('option');
      option.value = String(chapter.id);
      option.textContent = `Chương ${chapter.id}: ${chapter.title}`;
      select.append(option);
    });
    const requestedChapter = new URLSearchParams(location.search).get('chapter');
    if (requestedChapter && state.chapters.some((chapter) => String(chapter.id) === requestedChapter)) select.value = requestedChapter;
  }

  function selectedPool() {
    const value = $('#chapter-select').value;
    return value === 'all' ? state.questions : state.questions.filter((question) => String(question.chapter) === value);
  }

  function updateAvailableCount() {
    const count = selectedPool().length;
    const selected = $('#question-count').value;
    const wanted = selected === 'all' ? count : Number(selected);
    $('#available-count').textContent = `Có ${count} câu trong phạm vi đã chọn. Bài làm sẽ gồm ${Math.min(wanted, count)} câu ngẫu nhiên.`;
    $('#start-btn').disabled = count === 0;
  }

  function startQuiz() {
    state.submitting = false;
    const pool = selectedPool();
    const countValue = $('#question-count').value;
    const count = countValue === 'all' ? pool.length : Math.min(Number(countValue), pool.length);
    state.active = shuffle(pool).slice(0, count);
    state.index = 0;
    state.answers.clear();
    state.flagged.clear();
    state.seconds = Number($('#time-limit').value) * 60;
    $('#setup-panel').hidden = true;
    $('#result-panel').hidden = true;
    $('#quiz-panel').hidden = false;
    renderQuestion();
    renderMap();
    startTimer();
  }

  function renderQuestion() {
    const question = state.active[state.index];
    if (!question) return;
    const selected = state.answers.get(question.id);
    $('#progress-label').textContent = `Câu ${state.index + 1}/${state.active.length}`;
    $('#chapter-label').textContent = `Chương ${question.chapter}: ${chapterTitle(question.chapter)}`;
    $('#question-text').textContent = question.question;
    $('#progress-bar').style.width = `${((state.index + 1) / state.active.length) * 100}%`;
    $('#prev-btn').disabled = state.index === 0;
    $('#next-btn').textContent = state.index === state.active.length - 1 ? 'Câu đầu' : 'Câu tiếp';
    const flagButton = $('#flag-btn');
    const isFlagged = state.flagged.has(question.id);
    flagButton.setAttribute('aria-pressed', String(isFlagged));
    flagButton.textContent = isFlagged ? '★ Đã đánh dấu xem lại' : '☆ Đánh dấu xem lại';

    const options = $('#answer-options');
    options.replaceChildren();
    question.options.forEach((text, index) => {
      const label = document.createElement('label');
      label.className = 'answer';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${question.id}`;
      input.value = letters[index];
      input.checked = selected === letters[index];
      input.addEventListener('change', () => {
        state.answers.set(question.id, letters[index]);
        renderMap();
      });
      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.textContent = `${letters[index]}.`;
      const answerText = document.createElement('span');
      answerText.textContent = escapeText(text);
      label.append(input, letter, answerText);
      options.append(label);
    });
    renderMap();
  }

  function renderMap() {
    const map = $('#question-map');
    map.replaceChildren();
    state.active.forEach((question, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'map-button';
      button.textContent = String(index + 1);
      button.setAttribute('aria-label', `Câu ${index + 1}${state.answers.has(question.id) ? ', đã chọn đáp án' : ', chưa trả lời'}${state.flagged.has(question.id) ? ', đánh dấu xem lại' : ''}`);
      if (state.answers.has(question.id)) button.classList.add('answered');
      if (state.flagged.has(question.id)) button.classList.add('flagged');
      if (index === state.index) button.classList.add('current');
      button.addEventListener('click', () => { state.index = index; renderQuestion(); });
      map.append(button);
    });
  }

  function startTimer() {
    clearInterval(state.timerId);
    const timer = $('#timer');
    if (!state.seconds) {
      timer.textContent = 'Không giới hạn';
      return;
    }
    updateTimer();
    state.timerId = setInterval(() => {
      state.seconds -= 1;
      updateTimer();
      if (state.seconds <= 0) finishQuiz(true);
    }, 1000);
  }

  function updateTimer() {
    const mins = Math.floor(state.seconds / 60).toString().padStart(2, '0');
    const secs = (state.seconds % 60).toString().padStart(2, '0');
    $('#timer').textContent = `${mins}:${secs}`;
  }

  async function finishQuiz(timeExpired = false) {
    if (state.submitting) return;
    state.submitting = true;
    const unanswered = state.active.length - state.answers.size;
    if (!timeExpired && unanswered) {
      const confirmed = await window.appConfirm({
        title: 'Nộp bài khi còn câu bỏ trống?',
        message: `Bạn còn ${unanswered} câu chưa trả lời. Các câu này sẽ được tính là chưa đúng.`,
        confirmText: 'Nộp bài',
        cancelText: 'Tiếp tục làm bài'
      });
      if (!confirmed) { state.submitting = false; return; }
    }
    clearInterval(state.timerId);
    const correctCount = state.active.reduce((total, question) => total + (state.answers.get(question.id) === question.answer ? 1 : 0), 0);
    const attempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      score: correctCount,
      total: state.active.length,
      questions: state.active.map((question) => ({
        id: question.id, chapter: question.chapter, question: question.question, options: question.options,
        correctAnswer: question.answer, selectedAnswer: state.answers.get(question.id) ?? null
      }))
    };
    try {
      const attempts = JSON.parse(localStorage.getItem('gdqp-quiz-attempts') || '[]');
      attempts.unshift(attempt);
      localStorage.setItem('gdqp-quiz-attempts', JSON.stringify(attempts.slice(0, 50)));
      $('#review-attempt-link').href = `../answer-review/?attempt=${encodeURIComponent(attempt.id)}`;
    } catch { $('#review-attempt-link').hidden = true; }
    $('#score').textContent = `${correctCount}/${state.active.length}`;
    $('#score-detail').textContent = `(${Math.round((correctCount / state.active.length) * 100)}%)${timeExpired ? ' · Hết giờ' : ''}`;
    const review = $('#review-list');
    review.replaceChildren();
    state.active.forEach((question, index) => {
      const item = document.createElement('article');
      item.className = 'review-item';
      const title = document.createElement('h3');
      title.textContent = `Câu ${index + 1}. ${question.question}`;
      const answer = state.answers.get(question.id);
      const result = document.createElement('p');
      result.className = answer === question.answer ? 'correct' : 'incorrect';
      result.textContent = answer === question.answer ? `Bạn chọn ${answer} · Chính xác` : `Bạn chọn ${answer ?? 'chưa trả lời'} · Đáp án đúng: ${question.answer}`;
      const correctText = document.createElement('p');
      correctText.textContent = `${question.answer}. ${question.options[letters.indexOf(question.answer)]}`;
      item.append(title, result, correctText);
      review.append(item);
    });
    $('#quiz-panel').hidden = true;
    $('#result-panel').hidden = false;
    $('#result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $('#chapter-select').addEventListener('change', updateAvailableCount);
  $('#question-count').addEventListener('change', updateAvailableCount);
  $('#start-btn').addEventListener('click', startQuiz);
  $('#prev-btn').addEventListener('click', () => { if (state.index > 0) { state.index -= 1; renderQuestion(); } });
  $('#next-btn').addEventListener('click', () => { state.index = (state.index + 1) % state.active.length; renderQuestion(); });
  $('#flag-btn').addEventListener('click', () => {
    const id = state.active[state.index].id;
    if (state.flagged.has(id)) state.flagged.delete(id); else state.flagged.add(id);
    renderQuestion();
  });
  $('#finish-btn').addEventListener('click', () => finishQuiz());
  $('#retry-btn').addEventListener('click', () => {
    $('#result-panel').hidden = true;
    $('#setup-panel').hidden = false;
    $('#setup-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  loadBank();
})();




