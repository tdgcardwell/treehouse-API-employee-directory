// ===================
//  FETCH
// ===================

let randomUsers;

function fetchData(url) {
  return fetch(url)
    .then(checkStatus) //catch errors if there are any
    .then(response => response.json())
    .catch(error => console.log('Dangit. Seems there was a problem', error))
}

Promise.all([
  fetchData('https://randomuser.me/api/?results=12')
])
.then( data => {
  randomUsers = data[0].results;
  generateCards(randomUsers);


})

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error( response.statusText ))
  }
}


// ===================
//  CARDS
// ===================

let main = document.querySelector('main');


function generateCards(data) {
  data.forEach(user => {

    console.log(user)

    main.innerHTML += `
    <div class="card">
      <img src="${user.picture.large}" alt="">
      <div class="">
        <h2>${user.name.first} ${user.name.last}</h2>
        <span class="email">email@address.com</span>
        <span class="city">Indianapolis</span>
      </div>
    </div>
    `;

  });
}
