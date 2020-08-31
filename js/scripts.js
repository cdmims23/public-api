/** Global Variables **/
const url = 'https://randomuser.me/api/?results=12&nat=us';
const galleryDiv = document.querySelector('#gallery');
const body = document.querySelector('body');
let apiData;
let closeBtn;

/** Helper Functions **/
function fetchData(url) {
    fetch(url)
    .then(data => data.json())
    .then(json => {
        apiData = json.results;
        buildGallery(apiData);
    })
    .then(() =>{
        const employees = document.querySelectorAll('.card');
        for(let i=0; i < employees.length; i++) {
            employees[i].addEventListener('click', (e) => {
                // if statement is to make sure i'm getting the correct reference for the showModal function
                if(e.target.className === 'card') {
                    showModal(e.target);
                    // Added the closeModal calls because this is the only time to get a reference to the close button.
                    closeModal(body)
                } else if(e.target.parentElement.className === 'card-info-container' || e.target.parentElement.className === 'card-img-container'){
                    showModal(e.target.parentElement.parentElement);
                    closeModal(body)
                } else {
                    showModal(e.target.parentElement);
                    closeModal(body)
                }
            });
        }
    })
}

function buildGallery(data) {
    let galleryHTML = '';
    data.map(employee => {
        galleryHTML += `
        <div class="card" data-name="${employee.name.first} ${employee.name.last}">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
             </div>
        </div>`
    });
    galleryDiv.insertAdjacentHTML('afterbegin', galleryHTML);
}

/** Helper function to close the modal once the button is clicked **/
function closeModal(body) {
    const modal = document.querySelector('.modal-container');
    closeBtn = document.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', (e) => body.removeChild(modal));
}

function showModal(reference) {
 let modal = '';

 const employee = apiData.filter(person => `${person.name.first} ${person.name.last}` === reference.dataset['name'])[0]

 // Date object for the birthday and options to format it.
 const birthdate = new Date(employee.dob.date);
 const options = {year: 'numeric', day: 'numeric', month: 'long'};

 modal += `
 <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${birthdate.toLocaleDateString('US', options)}</p>
        </div>
    </div>
</div>`;
body.insertAdjacentHTML('beforeend', modal);
}

// Call to fetch data from the API
fetchData(url);