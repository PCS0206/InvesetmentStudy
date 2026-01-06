const postList = document.getElementById('post-list');

fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    // 최신순 정렬
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'post-card';

      const title = document.createElement('a');
      title.href = `post/${post.filename}`;
      title.className = 'post-title';
      title.textContent = post.title;

      const date = document.createElement('div');
      date.className = 'post-date';
      date.textContent = post.date;

      const summary = document.createElement('p');
      summary.className = 'post-summary';
      summary.textContent = post.summary;

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(summary);

      postList.appendChild(card);
    });
  })
  .catch(err => console.error('글 목록 로드 실패:', err));
