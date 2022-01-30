let openButton = document.querySelector('.profile__edit-button');
let openCardButton = document.querySelector('.profile__add-button');
let popupStatus = document.querySelector('.popup_type_profile');
let popupCard = document.querySelector('.popup_type_card');
let closeButton = document.querySelector('.popup__close-button');
let closeCardButton = document.querySelector('.popup-card__close-button');
let formElement = document.querySelector('.popup__form');
let cardFormElement = document.querySelector('.popup-card__form');
let nameInput = document.querySelector('#name-field');
let jobInput = document.querySelector('#job-field');
let placeNameInput = document.querySelector('#place-name-field');
let linkInput = document.querySelector('#link-field');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__caption');
let popupImageCaption = document.querySelector('.popup-image__caption');
const popupImageImg = document.querySelector('.popup-image__img');
const popupImage = document.querySelector('.popup_type_image');
let popupImageCloseButton =document.querySelector('.popup-image__close-button');
const cardTemplate = document.querySelector('#tmpl').content;


let cardsList = document.querySelector('.cards__list');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const createCard = (item) => {
  const cardElement = cardTemplate.querySelector('.cards__list-item').cloneNode(true);
  cardElement.querySelector('.cards__title').textContent = item.name;
  cardElement.querySelector('.cards__image').alt = item.name;
  cardElement.querySelector('.cards__image').src = item.link;
  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    openPopup(popupImage);
    popupImageCaption.textContent = item.name;
    popupImageImg.src = item.link;
    popupImageImg.alt = item.name;
  });
  cardElement.querySelector('.cards__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });
  cardElement.querySelector('.cards__delete-button').addEventListener('click', function(evt) {
    const deletingCard = evt.target.closest('.cards__list-item');
    deletingCard.remove();
  });
  return cardElement;
};
const cards = initialCards.map(createCard);
cardsList.prepend(...cards);

 const renderCard = (name, link) => {
  const addedCard = createCard({ name, link });
  cardsList.prepend(addedCard);
};

function submitCardFormHandler (evt) {
  evt.preventDefault(); 
  const placeNameValue = placeNameInput.value;
  const placeLink = linkInput.value;
  renderCard(placeNameValue, placeLink);
  closePopup(popupCard);
};



function openPopup(popup) {
  popup.classList.add('popup_opened');
  
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
}
/*const cardsLikeButtons = document.querySelectorAll('.cards__like-button');
cardsLikeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });
});

const deleteButtons = document.querySelectorAll(".cards__delete-button");
deleteButtons.forEach(button => {
  button.addEventListener('click', function(evt){
    const deletingCard = evt.target.closest('.cards__list-item');
    deletingCard.remove();
  });
});*/
popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});
formElement.addEventListener('submit', submitFormHandler); 
openButton.addEventListener('click', () => {
  openPopup(popupStatus);
  getName();
});
closeButton.addEventListener('click', () => {
  closePopup(popupStatus);
});
openCardButton.addEventListener('click', () => {
  openPopup(popupCard)
  clearForm();
});

closeCardButton.addEventListener('click', () => {
  closePopup(popupCard)
});
cardFormElement.addEventListener('submit', submitCardFormHandler); 
