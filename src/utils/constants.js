import {FormValidator} from "../components/FormValidator";

export const initialCards = [
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
  
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const popupProfileSelector = '.popup_type_profile';
export const openCardButton = document.querySelector('.profile__add-button');
export const popupStatus = document.querySelector('.popup_type_profile');
export const popupCard = document.querySelector('.popup_type_card');
export const profileName = '.profile__name';
export const openButton = document.querySelector('.profile__edit-button');
export const profileJob = '.profile__caption';
export const profileForm = popupStatus.querySelector('.popup__form_type_profile');
export const cardForm = popupCard.querySelector('.popup__form_type_card');
export const cardTemplateSelector = '#tmpl';
export const cardListSelector = '.cards__list';
export const popupImgSelector = '.popup_type_image';
export const popupCardSelector = '.popup_type_card';
export const nameInput = document.querySelector('#name-field');
export const captionInput = document.querySelector('#job-field');
