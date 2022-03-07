/**
 * @name mySearchBar
 * Searches names (and maybe cities - if I can get that to work) and displays only cards with matching information.
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


  // for each card

  // get text of card to lower case

  // if searchstring to lowercase is NOT included in card

  // set card to display none

  //else

  //display as normal




  // FOR each caption
  for (i = 0; i < images.length; i++) {

    // IF searchString to lowercase is NOT included within caption
    if (!images[i].getAttribute('title').toLowerCase().includes(searchString)) {

      // set to display none
      images[i].style.display="none";

    // ELSE
    }else {

      // display as normal
      images[i].style.display="block";

    //ENDIF
  // ENDFOR
// end function
    }
  }
}
