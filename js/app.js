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


// ------ modal
$( "body").on( "click", ".card", function(event) {
  toggleModal();
  console.log(this.id); //this is how we know which one.

  dateOfBirth = new Date(randomUsers[this.id].dob.date);

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

  // console.log(`${dobMonth} / ${dobDay} / ${dobYear}`);

  modal.html(`
    <span class="abs close"><i class="fa-solid fa-xmark"></i></span>
    <span class="abs prev"><i class="fa-solid fa-backward-step"></i></span>
    <span class="abs next"><i class="fa-solid fa-forward-step"></i></span>
    <img src="${randomUsers[this.id].picture.large}" alt="">
    <div class="">
      <h2>${randomUsers[this.id].name.first} ${randomUsers[this.id].name.last}</h2>
      <span class="email">${randomUsers[this.id].email}</span>
      <span class="city">${randomUsers[this.id].location.city}</span>
      <div class="adtl">
        <span class="phone">${randomUsers[this.id].phone}</span>
        <span class="address">${randomUsers[this.id].location.street.number} ${randomUsers[this.id].location.street.name}, ${randomUsers[this.id].location.city}, ${randomUsers[this.id].location.state} ${randomUsers[this.id].location.postcode}</span>
        <span class="birthday">Birthday: ${dobMonth} / ${dobDay} / ${dobYear}</span>
      </div>
    </div>
    `);
  let closeButton = $(".close");

  closeButton.click(toggleModal);
});
