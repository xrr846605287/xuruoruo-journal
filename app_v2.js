// 升级版：支持标签+评论
let posts=JSON.parse(localStorage.getItem('posts')||'[]');

function render(){
  const feed=document.getElementById('feed');
  feed.innerHTML='';

  posts.forEach((post,index)=>{
    const div=document.createElement('div');
    div.className='card';

    div.innerHTML=`
      <img src="${post.image}">
      <div class="content">
        <h4>${post.title}</h4>
        <p>${post.desc}</p>
        <div>${(post.tags||[]).map(t=>`#${t}`).join(' ')}</div>
        ❤️ ${post.likes} 💬 ${post.comments?post.comments.length:0}
        <br/>
        <button onclick="like(${index})">点赞</button>
        <button onclick="comment(${index})">评论</button>
      </div>
    `;

    feed.appendChild(div);
  });
}

function addPost(){
  const file=document.getElementById('imageInput').files[0];
  const title=document.getElementById('titleInput').value;
  const desc=document.getElementById('descInput').value;
  const tags=(prompt('输入标签，用逗号分隔')||'').split(',');

  const reader=new FileReader();
  reader.onload=function(e){
    posts.unshift({image:e.target.result,title,desc,tags,likes:0,comments:[]});
    localStorage.setItem('posts',JSON.stringify(posts));
    render();
  };

  if(file)reader.readAsDataURL(file);
}

function like(index){posts[index].likes++;localStorage.setItem('posts',JSON.stringify(posts));render();}

function comment(index){
  const text=prompt('写评论');
  if(!text) return;
  if(!posts[index].comments) posts[index].comments=[];
  posts[index].comments.push(text);
  localStorage.setItem('posts',JSON.stringify(posts));
  render();
}

render();