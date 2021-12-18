let openButton = document.querySelector('.profile__edit-button');
let popupStatus = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name-field');
let jobInput = document.querySelector('#job-field');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__caption');


function openPopup() {
  popupStatus.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


function closePopup() {
  popupStatus.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler); 
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);