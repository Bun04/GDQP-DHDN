(async () => {
  const host = document.querySelector('#chapter-list');
  try {
    const [questionsResponse, chaptersResponse] = await Promise.all([fetch('../../src/questions.json'), fetch('../../src/chapters.json')]);
    if (!questionsResponse.ok || !chaptersResponse.ok) throw new Error('Không tải được ngân hàng câu hỏi.');
    const [questions, chapters] = await Promise.all([questionsResponse.json(), chaptersResponse.json()]);
    host.replaceChildren();
    chapters.forEach((chapter) => {
      const count = questions.filter((question) => question.chapter === chapter.id).length;
      const card = document.createElement('article'); card.className = 'panel chapter-card';
      const title = document.createElement('h2'); title.textContent = `Chương ${chapter.id}: ${chapter.title}`;
      const description = document.createElement('p'); description.textContent = `${count} câu hỏi trong ngân hàng`;
      const link = document.createElement('a'); link.className = 'button outline'; link.href = `../quiz/?chapter=${chapter.id}`; link.textContent = 'Luyện chương này';
      card.append(title, description, link); host.append(card);
    });
  } catch (error) { host.textContent = error.message; }
})();
