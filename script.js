async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
}



  // Notiz-Post hinzufügen - Beginn
  let posts = []; // wurde global deklariert
  let titles = []; // wurde ebenfalls global deklariert

  let postsAsText = [];
  let titlesAsText = [];


  function addMyPost() {
    let text = document.getElementById('notice').value;
    let title = document.getElementById('title').value;

    if(text.trim() !== '' && title.trim() !== ''){ //text.trim, vergleicht ob Leerzeichen existieren, wenn dies der Fall wird das Input-Feld auch als leer betrachtet
    posts.push(text);     //hängt ein oder mehrere Elemente an das Ende eines Arrays
    titles.push(title);   //hängt ein oder mehrere Elemente an das Ende eines Arrays
    

    document.getElementById('notice').value = '';
    document.getElementById('title').value = '';

    save();
    render(); 
  }
}


  // Notiz-Post Hinzufügen - Ende


// Speichern - Beginn
function save(){

  let postsAsText = JSON.stringify(posts);
  localStorage.setItem('posts', postsAsText);

  let titlesAsText = JSON.stringify(titles); 
  localStorage.setItem('titles', titlesAsText);

}
// Speichern - Ende

function render(){

  let myposts = document.getElementById('myposts');
    myposts.innerHTML = '';

    for(let i=0; i < posts.length; i++){ // wenn man mit Arrays arbeitet, sind For-Schleifen zu benutzen


    //von hier werden die Werte von dem Array auf die HTML-Seite übertragen
    myposts.innerHTML += /*html*/`
    <div class="post">
      <b class="headline">${titles[i]}</b> <br>    
      <b>${posts[i]}</b> <br>
      <div>
        <button  onclick="deleteNotice(${i})">Löschen</button>
        <i class="fas fa-trash-alt"></i>
      <!--<img onclick="deleteNotice(${i})" src="/img/waste.png" alt="Delete">-->
      </div>
      </div>`;

    }

    document.getElementById('notice').value = '';
    document.getElementById('title').value = '';

  }


// Löschen - Beginn
  function deleteNotice(i) {
    posts.splice(i, 1);
    titles.splice(i, 1);
    addMyPost();
    save();
    render();
  
  }
// Löschen - Ende

function showMenu() {
      document.getElementById('menu').classList.add('show-overlay');
}

function closeMenu() {
      document.getElementById('menu').classList.remove('show-overlay');
}