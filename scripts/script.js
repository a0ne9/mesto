const openButton = document.querySelector('.profile__edit-button');
const openCardButton = document.querySelector('.profile__add-button');
const popupStatus = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const closeButton = document.querySelector('.popup__close-button');
const closeCardButton = document.querySelector('.popup__card-close-button');
const profileFormElement = document.querySelector('.popup__form');
const cardFormElement = document.querySelector('.popup__form_type_card');
const nameInput = document.querySelector('#name-field');
const jobInput = document.querySelector('#job-field');
const placeNameInput = document.querySelector('#title-field');
const linkInput = document.querySelector('#link-field');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__caption');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImageImg = document.querySelector('.popup__img');
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton =document.querySelector('.popup__image-close-button');
const cardTemplate = document.querySelector('#tmpl').content;
const popups = document.querySelectorAll('.popup');


const cardsList = document.querySelector('.cards__list');
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
  const cardImage = cardElement.querySelector('.cards__image');
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardImage.addEventListener('click', () => {
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
  document.addEventListener('keydown', escClose);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
  clearErrors();
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

function escClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

popups.forEach((element)=> {
  element.addEventListener('click', (evt) => {
    evt.target.classList.remove('popup_opened');
  });
});


popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});
profileFormElement.addEventListener('submit', submitFormHandler); 
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


