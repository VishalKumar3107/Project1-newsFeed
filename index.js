// toggle button
const btn = document.querySelector('.toggle-btn');
const content = document.querySelector('.content');
content.classList.toggle('hidden');
btn.addEventListener('click', () => {
  content.classList.toggle('hidden');
});



// fetch function
function dbx(a) {
  var remove = document.getElementsByClassName('.remove');
  var columns = document.querySelectorAll('.column');
  columns.forEach(function (column) {
    while (column.firstChild) {
      column.removeChild(column.firstChild);
    }
  });

  const loader = document.querySelector('.loader');
  const categoriesDiv = document.querySelector('.categories');

  loader.style.display = 'block';
  let pro = fetch(`https://inshorts.deta.dev/news?category=${a.value}`)
  .then((reponse) => {
    return reponse.json()
  })
  .then((value) => {
    var s = value.data;
    for (var i = 0; i < s.length; i++) {
      var auth = s[i].author;
      var content = s[i].content;
      var image = s[i].imageUrl;

      filling(auth, content, i, image);
      loader.style.display = 'none';
      categoriesDiv.style.display = 'block';
    }
  })
  .catch((error) => {
    console.log('An error occurred:', error);
  });


  // function to fill news in each div
  function filling(auth, content, index, image) {
    var span = document.createElement('span');
    var span1 = document.createElement('span');
    var p = document.createElement('p');
    var div = document.createElement('div');
    var l = document.createElement('i');

    l.setAttribute('class', 'fa-solid fa-heart myicon');
    l.setAttribute('onclick', 'saved(this)');
    div.setAttribute('class', 'textarea remove');

    span.innerHTML = "Author :" + auth;
    span1.innerHTML = "Category :" + a.innerHTML;
    p.innerHTML = content;
    div.appendChild(span1);
    if (image) {
      var img = document.createElement('img');
      img.setAttribute('src', image);
      img.setAttribute('alt', 'news image');
      div.appendChild(img);
    }
    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(l);

    if (index % 4 === 0) {
      var column = document.querySelector('.column:nth-child(1)');
      column.appendChild(div);
    } else if (index % 4 === 1) {
      var column = document.querySelector('.column:nth-child(2)');
      column.appendChild(div);
    } else if (index % 4 === 2) {
      var column = document.querySelector('.column:nth-child(3)');
      column.appendChild(div);
    } else {
      var column = document.querySelector('.column:nth-child(4)');
      column.appendChild(div);
    }
  }
}


//function to save a news
function saved(a) {
  var data = document.querySelector('.stored');
  var x = a.parentNode;
  data.appendChild(x);
  data.removeChild(savedImg);
  console.log(x);
}
var savedDivs = document.querySelectorAll('.stored .textarea');
savedDivs.forEach(function (savedDiv) {
  var savedImg = savedDiv.querySelector('img');
  if (savedImg) {
    savedDiv.removeChild(savedImg);
  }
});