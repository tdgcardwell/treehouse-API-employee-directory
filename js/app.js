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
  fetchData('https://randomuser.me/api/?results=12&nat=us')
])
.then( data => {
  randomUsers = data[0].results;
  generateCards(randomUsers);
  cardListeners();
  console.log(randomUsers);

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
let usercount = 0;


function generateCards(data) {
  data.forEach(user => {

    // console.log(user)

    main.innerHTML += `
    <div class="card" id="${usercount}">
      <img src="${user.picture.large}" alt="">
      <div class="">
        <h2>${user.name.first} ${user.name.last}</h2>
        <span class="email">${user.email}</span>
        <span class="city">${user.location.city}</span>
      </div>
    </div>
    `;

    usercount++;

  });
}

// ===================
//  INTERACTIONS
// ===================

let modalBox = $(".modal-box");
let modal = $(".modal");
let overlay = $(".overlay");

overlay.click(toggleModal);

function toggleModal() {
  modalBox.toggleClass("modal-box-on");
}

//New Log
// newButton.addEventListener('click', (e)=> {
//
// });

function replaceModal(i) {
  // console.log('clicky');

  newID = i;
  previousPerson = i-1;
  if (previousPerson < 0) {
    previousPerson = 11;
  }
  console.log('previous ' + previousPerson);

  nextPerson = i++ +1;
  if (nextPerson > 11) {
    nextPerson = 0;
  }
  console.log('next ' + nextPerson);

  dateOfBirth = new Date(randomUsers[newID].dob.date);

  dobMonth = dateOfBirth.getMonth();
  dobMonth +=1; // fix 0 offset
  if (dobMonth < 10) {
    dobMonth = "0" + dobMonth;
  }

  dobDay = dateOfBirth.getDate();
  if (dobDay < 10) {
    dobDay = "0" + dobDay;
  }

  dobYear = dateOfBirth.getYear();

  modal.html(`
    <span class="abs close"><i class="fa-solid fa-xmark"></i></span>
    <span class="abs prev"><i class="fa-solid fa-backward-step"></i></span>
    <span class="abs next"><i class="fa-solid fa-forward-step"></i></span>
    <img src="${randomUsers[newID].picture.large}" alt="">
    <div class="">
      <h2>${randomUsers[newID].name.first} ${randomUsers[newID].name.last}</h2>
      <span class="email">${randomUsers[newID].email}</span>
      <span class="city">${randomUsers[newID].location.city}</span>
      <div class="adtl">
        <span class="phone">${randomUsers[newID].phone}</span>
        <span class="address">${randomUsers[newID].location.street.number} ${randomUsers[newID].location.street.name}, ${randomUsers[newID].location.city}, ${randomUsers[newID].location.state} ${randomUsers[newID].location.postcode}</span>
        <span class="birthday">Birthday: ${dobMonth} / ${dobDay} / ${dobYear}</span>
      </div>
    </div>
    `);
    let closeButton = $(".close");
    closeButton.click(toggleModal);

    let prevButton = document.querySelector('.prev');
    let nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', event => {
      replaceModal(previousPerson);
    });

    nextButton.addEventListener('click', event => {
      replaceModal(nextPerson);
    });




}

// ------ modal

function cardListeners(){
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', event => {
      toggleModal();

      // console.log(event.currentTarget.id);
      // currentTarget - this is the useful bit

      who = event.currentTarget.id;
      console.log(who);

      replaceModal(who);


    });
  });
}
