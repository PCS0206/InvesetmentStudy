const postList = document.getElementById('post-list');
const paginationContainer = document.createElement('div');
paginationContainer.id = 'pagination';
paginationContainer.style.textAlign='center';
paginationContainer.style.marginTop='50px';
paginationContainer.style.marginBottom='50px';
postList.parentNode.appendChild(paginationContainer);

const postsPerPage = 7;
let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
let totalPages = 1;
let currentTag = '모두';

// Markdown 글 목록 (파일 경로 = post/파일명.md)
allPosts = [
  {filename: "2026-01-10-test.md", title:"오늘의 투자 공부", date:"2026-01-10", tags:["주식","옵션"]},
  {filename: "2026-01-07-option.md", title:"옵션 전략 정리", date:"2026-01-07", tags:["옵션","전략"]},
  {filename: "2026-01-05-etf.md", title:"ETF 투자 기초", date:"2026-01-05", tags:["ETF","기초"]}
];

// 태그 사이드바
const uniqueTags=["모두","주식","옵션","전략","ETF","기초"];
const sidebar = document.querySelector('.categories ul');
uniqueTags.forEach(tag=>{
  const li=document.createElement('li');
  const btn=document.createElement('button');
  btn.textContent=tag;
  btn.onclick=()=>{currentTag=tag; currentPage=1; filterPosts();};
  li.appendChild(btn);
  sidebar.appendChild(li);
});

// 필터링 + 페이지네이션
function filterPosts(){
  filteredPosts = currentTag==='모두' ? allPosts : allPosts.filter(p=>p.tags.includes(currentTag));
  totalPages=Math.ceil(filteredPosts.length/postsPerPage);
  renderPage(currentPage);
}

function renderPage(page){
  postList.innerHTML='';
  const start=(page-1)*postsPerPage;
  const end=start+postsPerPage;
  const pagePosts=filteredPosts.slice(start,end);

  pagePosts.forEach(post=>{
    const card=document.createElement('div');
    card.className='post-card';

    const title=document.createElement('a');
    title.href=`post/${post.filename.replace('.md','.html')}`;
    title.className='post-title';
    title.textContent=post.title;

    const date=document.createElement('div');
    date.className='post-date';
    date.textContent=post.date;

    card.appendChild(title);
    card.appendChild(date);
    postList.appendChild(card);
  });

  renderPagination();
}

function renderPagination(){
  paginationContainer.innerHTML='';
  if(totalPages<=1) return;

  const prev=document.createElement('button');
  prev.textContent='이전';
  prev.disabled=currentPage===1;
  prev.onclick=()=>{currentPage--; renderPage(currentPage);};

  const next=document.createElement('button');
  next.textContent='다음';
  next.disabled=currentPage===totalPages;
  next.onclick=()=>{currentPage++; renderPage(currentPage);};

  paginationContainer.appendChild(prev);
  paginationContainer.appendChild(document.createTextNode(` ${currentPage} / ${totalPages} `));
  paginationContainer.appendChild(next);
}

// 초기 렌더
filterPosts();

