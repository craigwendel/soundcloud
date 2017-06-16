/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

// 2. Create your `onSubmit` event for getting the user's search term

// 3. Create your `fetch` request that is called after a submission

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play

document.querySelector('form').addEventListener('submit', function(event) {
event.preventDefault();

let search = document.querySelector('#search-bar');
let searchUsers = search.value;
getSongSearch(searchUsers);
})

function getSongSearch(searchUsers) {

  fetch('http://api.soundcloud.com/users/?client_id=8538a1744a7fdaa59981232897501e04&q='+searchUsers+"''")
  .then( function(response){
    return response.json()
    console.log(json)
  })
  .then(function(json){
    console.log(json)
  for (let i = 0; i < json.length; i++) {
    let userInfo = {
      userName: json[i].username,
      userID: json[i].id,
      userImage: json[i].avatar_url,
  }
    if (!userInfo.userImage) {
      userInfo.userImage = 'http://www.firemagicgrills.com/wp-content/uploads/accessories-small-placeholder.jpg'
    }

    // const upperHtml =
    // `<div class="audio-url">
    //   <div class="play-audio"><audio src"=${streamURL}"/></div>
    // </div>`

    const lowerHtml =
    `<div class="user-info">
      <img src="${userInfo.userImage}">
      <p class="user-name">${userInfo.userName}</p>
    </div>`

    // document.querySelector(".player").insertAdjacentHTML('afterbegin', upperHtml)
    document.querySelector('.results').insertAdjacentHTML('beforeend', lowerHtml)
    }
  })
  .then(function () {
    let userInfoDivs = document.querySelectorAll(".user-info");
    userInfoDivs.forEach(function(item) {
    console.log(item);
    })

    userInfoDivs.forEach(function(item)  {
    item.addEventListener("click",function() {
      console.log('click!');
      fetch('http://api.soundcloud.com/tracks/'+userInfo.userID+'/?client_id=8538a1744a7fdaa59981232897501e04')
    })
  })

  })
};
