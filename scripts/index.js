import { FormValidator } from './FormValidator.js';
import { initialCards, config, popupImage, popupImageImg, popupImageCaption, popupImageCloseButton} from './constants.js';
import { openPopup, closePopup } from './utils.js';
import { Card } from './Card.js';
const openButton = document.querySelector('.profile__edit-button');
const openCardButton = document.querySelector('.profile__add-button');
const popupStatus = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const closeButton = document.querySelector('.popup__close-button');
const closeCardButton = document.querySelector('.popup__card-close-button');
const profileFormElement = document.querySelector('.popup__form_type_profile');
const cardFormElement = document.querySelector('.popup__form_type_card');
const nameInput = document.querySelector('#name-field');
const jobInput = document.querySelector('#job-field');
const placeNameInput = document.querySelector('#title-field');
const linkInput = document.querySelector('#link-field');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__caption');
const cardTemplate = document.querySelector('#tmpl').content;
const popups = document.querySelectorAll('.popup');
const cardsList = document.querySelector('.cards__list');
const profileForm = popupStatus.querySelector('.popup__form_type_profile');
const cardForm = popupCard.querySelector('.popup__form_type_card');
const profileFormValidator = new FormValidator(config, profileForm);
const cardFormValidator = new FormValidator(config, cardForm);
const cardTemplateSelector = '#tmpl';
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();





const renderCard = (data, cardsList) => {
  const addedCard = new Card(data, cardTemplateSelector);
  const cardElement = addedCard.createCard();
  cardsList.prepend(cardElement);
};

function submitCardFormHandler (evt) {
  evt.preventDefault(); 
  const placeNameValue = placeNameInput.value;
  const placeLink = linkInput.value;
  renderCard({name: placeNameValue, link: placeLink}, cardsList);
  closePopup(popupCard);
  disableButton();
};


function submitFormHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupStatus);
};

function getName() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function clearForm() {
  placeNameInput.value = '';
  linkInput.value = '';
};

const clearErrors = () => {
  const spans = Array.from(document.querySelectorAll('.popup__error_visible'));
  spans.forEach((element) => {
    element.textContent = ""
  });
};



popups.forEach((element)=> {
  element.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});


popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});
profileFormElement.addEventListener('submit', submitFormHandler); 
openButton.addEventListener('click', () => {
  openPopup(popupStatus);
  getName();
  clearErrors();
});
closeButton.addEventListener('click', () => {
  closePopup(popupStatus);
});
openCardButton.addEventListener('click', () => {
  openPopup(popupCard)
  clearForm();
  clearErrors();
});

closeCardButton.addEventListener('click', () => {
  closePopup(popupCard)
});
cardFormElement.addEventListener('submit', submitCardFormHandler);

initialCards.forEach((data) => {
  renderCard(data, cardsList);
});


