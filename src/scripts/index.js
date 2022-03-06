import { FormValidator } from './FormValidator.js';
import { initialCards, config } from './constants.js';
import { Card } from './Card.js';
import { Section }  from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import '../pages/index.css';
const popupProfileSelector = '.popup_type_profile';
const openButton = document.querySelector('.profile__edit-button');
const openCardButton = document.querySelector('.profile__add-button');
const popupStatus = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const profileName = '.profile__name';
const profileJob = '.profile__caption';
const profileForm = popupStatus.querySelector('.popup__form_type_profile');
const cardForm = popupCard.querySelector('.popup__form_type_card');
const profileFormValidator = new FormValidator(config, profileForm);
const cardFormValidator = new FormValidator(config, cardForm);
const cardTemplateSelector = '#tmpl';
const cardListSelector = '.cards__list';
const popupImgSelector = '.popup_type_image';
const popupCardSelector = '.popup_type_card';
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


const userInformation = new UserInfo({userNameSelector: profileName, userCaptionSelector: profileJob})


const profileFormPopup = new PopupWithForm(popupProfileSelector, {
  submitFormHandler: ()=> {
    const values = profileFormPopup._getInputValues();
    userInformation.setUserInfo(values);
    profileFormPopup.close()
    
  }
})


openButton.addEventListener('click', ()=> {
  profileFormPopup.open()
  const info = userInformation.getUserInfo();
  
  userInformation.fillInputs(info);

  profileFormValidator.clearErrors(popupStatus);

});




openCardButton.addEventListener('click', () => {
  cardFormValidator.clearErrors(popupCard);
  cardFormPopup.open();
});

const cardFormPopup = new PopupWithForm (
  popupCardSelector,
  {submitFormHandler: () => {
      const values = cardFormPopup._getInputValues();
      const newCard = createCard(values, cardTemplateSelector);
      cardsDefault.addItem(newCard);
      cardFormPopup.close();
      cardFormValidator.disableButton();
   }
  });

const profilePopup = new Popup(popupProfileSelector);
profilePopup.setEventListeners();

const imgPopup = new PopupWithImage(popupImgSelector);




const cardsDefault = new Section(
  {items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item, cardTemplateSelector);
    cardsDefault.addItem(newCard);
  }
 }, cardListSelector);
cardsDefault.renderItems();



function createCard(data) {
  
  const card = new Card(data, cardTemplateSelector, {
    handleCardClick: () => {
      imgPopup.open(data)
    }
  });
  const cardElement = card.getCardElement();
  return cardElement 
};