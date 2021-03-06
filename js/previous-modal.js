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

  let prevButton = $(".prev");
  let nextButton = $(".next");

  // prevButton.click(replaceModal);
  // nextButton.click(replaceModal);

});
