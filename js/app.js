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
  randomUsers = data[0];

  console.log(randomUsers);

})

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error( response.statusText ))
  }
}
