/** Global Variables **/
const url = 'https://randomuser.me/api/?results=12';
const galleryDiv = document.querySelector('#gallery');

/** Helper Functions **/
function fetchData(url) {
    fetch(url)
    .then(data => data.json())
    .then(json => buildGallery(json.results));
}

function buildGallery(data) {
    let galleryHTML = '';
    data.map(employee => {
        galleryHTML += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
             </div>
        </div>`
    });
    galleryDiv.insertAdjacentHTML('afterbegin', galleryHTML);
}

/**Event handlers**/


fetchData(url);