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
    <div class="card" id="${usercount}" value="${usercount}">
      <img src="${user.picture.large}" alt="" value="${usercount}">
      <div class="" value="${usercount}">
        <h2 value="${usercount}">${user.name.first} ${user.name.last}</h2>
        <span class="email" value="${usercount}">${user.email}</span>
        <span class="city" value="${usercount}">${user.location.city}</span>
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

/*

So, it's not working because if you click any element inside the div, that registers as the target... so it can't read the ID.

tried value, but can't pull the value.

look into bubbling?

*/


$( "main").on( "click", ".card", function(e) {
  console.log($(this).val());
});

// $( "body").on( "click", ".card", function(event) {
//
//   let who = randomUsers[event.target.id]
//
//   // let currentUser = event.target.id;
//   //
//   // console.log(currentUser);
//
//   generateModal(who);
//   toggleModal();
//   // console.log(event.target.id);
//   //this is how we know which one.
//
//
//
//
//   // let a = currentUser-1;
//   // let b = number(currentUser)+1;
//   // WHY?!?!?!?!
//
//
//
//   // let prev = $('.prev');
//   // let next = $('.next')
//
//   // prev.click( function(){
//   //
//   //   console.log(a);
//   // });
//   // next.click( function(){
//   //
//   //   console.log(b);
//   // });
//
//
//
//   let closeButton = $(".close");
//
//   closeButton.click(toggleModal);
// });


function generateModal(who){
  console.log(who);
  let dateOfBirth = new Date(who[dob][date]);

  let day = dateOfBirth.getDate();
  if (day < 10) {
    day = "0"+day;
  }

  let month = dateOfBirth.getMonth();
  month++; //because of starting at 0
  if (month < 10) {
    month = "0"+month;
  }

  let year = dateOfBirth.getYear();

  modal.html(`
    <span class="abs close"><i class="fa-solid fa-xmark"></i></span>
    <span class="abs prev"><i class="fa-solid fa-backward-step"></i></span>
    <span class="abs next"><i class="fa-solid fa-forward-step"></i></span>
    <img src="${who.picture.large}" alt="">
    <div class="">
      <h2>${who.name.first} ${who.name.last}</h2>
      <span class="email">${who.email}</span>
      <span class="city">${who.location.city}</span>
      <div class="adtl">
        <span class="phone">${who.cell}</span>
        <span class="address">${who.location.street.number} ${who.location.street.name}, ${who.location.city}, ${who.location.state} ${who.location.postcode}</span>
        <span class="birthday">Birthday: ${day}/${month}/${year}</span>
      </div>
    </div>
    `);
}
