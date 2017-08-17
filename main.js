/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

// 2. Create your `onSubmit` event for getting the user's search term

// 3. Create your `fetch` request that is called after a submission

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play

let audio = document.querySelector('.music-player');

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault()

  let search = document.querySelector('#search-bar')
  let searchUsers = search.value
  getSongSearch(searchUsers)
  document.querySelector('.results').textContent = ''
})

function getSongSearch (searchUsers) {
  fetch('http://api.soundcloud.com/users/?client_id=JvnNjeIJcp8Ec1Z6e2LOUmaRfJvHR1pm&q=' + searchUsers + "''")
  .then(function (response) {
    return response.json()
    console.log(json)
  })
  .then(function (json) {
    console.log(json)
    for (let i = 0; i < json.length; i++) {
      let userName = json[i].username
      let userID = json[i].id
      let userImage = json[i].avatar_url
      let trackNumber = json[i].track_count

      if (!userImage) {
        userImage = 'http://www.firemagicgrills.com/wp-content/uploads/accessories-small-placeholder.jpg'
      }
      const lowerHtml =
    `<div class="user-info" id="${userID}">
      <img src="${userImage}">
      <p class="user-name">${userName}</p>
      <p class="track-number">Available Tracks: ${trackNumber}</p>
    </div>`
      document.querySelector('.results').insertAdjacentHTML('beforeend', lowerHtml)
    }
  })
  .then(function () {
    let userInfoDivs = document.querySelectorAll('.user-info')
    userInfoDivs.forEach(function (item) {
      console.log(item)
    })
    for (let i = 0; i < userInfoDivs.length; i++) {
      let artistID = userInfoDivs[i].id
      userInfoDivs[i].addEventListener('click', function (evt) {
        pullTracks(artistID)
        document.querySelector('.results').textContent = ''
      })
    }
  })
  function pullTracks (selectedID) {
    fetch('http://api.soundcloud.com/users/' + selectedID + '/tracks/?client_id=8538a1744a7fdaa59981232897501e04')
          .then(function (response) {
            return response.json()
          })
            .then(function (json) {
              if (json.length === 0) {
                let trackFailure =
                `<p>Sorry, these tracks are only available on the SoundCloud Pro membership. For more information visit <a href="https://soundcloud.com/pro" target="_blank">https://soundcloud.com/pro</a></p>`
                document.querySelector('.results').insertAdjacentHTML('beforeend', trackFailure)
              }
              console.log('fetch request', json)
              for (let i = 0; i < json.length; i++) {
                let trackImage = json[i].artwork_url
                let trackName = json[i].title
                let audioStreamURL = json[i].stream_url

                if (!trackImage) {
                  trackImage = 'http://www.firemagicgrills.com/wp-content/uploads/accessories-small-placeholder.jpg'
                }

                const lowerHtml =
              `<div class="track-lists" id="${audioStreamURL}">
                <img src="${trackImage}">
                <p class="user-name">${trackName}</p>
              </div>`
                document.querySelector('.results').insertAdjacentHTML('beforeend', lowerHtml)
              }
            })
            .then(function () {
              let trackDivs = document.querySelectorAll('.track-lists')
                for (var i = 0; i < trackDivs.length; i++) {
                  let streamTrackURL = trackDivs[i].id
                  console.log(streamTrackURL)
                  trackDivs[i].addEventListener('click', function () {
                    playTrack(streamTrackURL)
                  })
                }
              })
  };
};
function playTrack (selectedURL) {
  audio.src = `${selectedURL}?client_id=JvnNjeIJcp8Ec1Z6e2LOUmaRfJvHR1pm`
  audio.autoplay = true;
}
