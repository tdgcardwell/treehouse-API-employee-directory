/**
 * @name mySearchBar
 * Searches text of each card and displays only cards with matching information.
 * @author Thomas Cardwell
 *
*/


//modified from the search function I built for previous photo gallery project

// function
function cardSearch() {

  // get input from search bar value
  let searchString = document.getElementById('searchbar').value

  // convert to lower case, so that search is not case sensitive
  searchString=searchString.toLowerCase();

  const cards = document.querySelectorAll('.card');

  // for each card
  cards.forEach(card => {

    // get text of card to lower case

    cardText = card.innerText;

    // if searchstring to lowercase is NOT included in card
    if (!cardText.toLowerCase().includes(searchString)) {

    // set card to display none
    card.style.display="none";

    //else
    } else {

    //display as normal
    card.style.display="block";

    }
  });

// end function
}
