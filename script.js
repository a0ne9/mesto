let openButton = document.querySelector('.profile__edit-button');
let popupStatus = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button')


function openPopup() {
  popupStatus.classList.add('popup__opened');
}


function closePopup() {
  popupStatus.classList.remove('popup__opened');
}


openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');


function formSubmitHandler (evt) {
  evt.preventDefault(); 
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__caption');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler); 