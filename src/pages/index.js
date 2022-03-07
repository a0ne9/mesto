import { FormValidator } from '../components/FormValidator.js';
import { initialCards, config, profileForm, cardForm, captionInput, cardListSelector, cardTemplateSelector, nameInput, openButton, openCardButton, popupCardSelector, popupImgSelector, popupProfileSelector, profileJob, profileName } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section }  from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

const profileFormValidator = new FormValidator(config, profileForm);
const cardFormValidator = new FormValidator(config, cardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


const userInformation = new UserInfo({userNameSelector: profileName, userCaptionSelector: profileJob})


const profileFormPopup = new PopupWithForm(popupProfileSelector, {
  submitFormHandler: ()=> {
    const values = profileFormPopup.getInputValues();
    userInformation.setUserInfo(values);
    profileFormPopup.close()
  }
})
profileFormPopup.setEventListeners();


openButton.addEventListener('click', ()=> {
  profileFormPopup.open()
  const info = userInformation.getUserInfo();
  nameInput.value = info.name;
  captionInput.value = info.caption;

  profileFormValidator.resetValidation();

});




openCardButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardFormPopup.open();
});

const cardFormPopup = new PopupWithForm (
  popupCardSelector,
  {submitFormHandler: () => {
      const values = cardFormPopup.getInputValues();
      const newCard = createCard(values, cardTemplateSelector);
      cardsDefault.addItem(newCard);
      cardFormPopup.close();
      cardFormValidator.disableButton();
   }
  });

cardFormPopup.setEventListeners();



const imgPopup = new PopupWithImage(popupImgSelector);
imgPopup.setEventListeners();




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