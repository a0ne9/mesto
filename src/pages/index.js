import { FormValidator } from '../components/FormValidator.js';
import { config, profileForm, cardForm, captionInput, cardListSelector, cardTemplateSelector, nameInput, openButton, openCardButton, popupCardSelector, popupImgSelector, popupProfileSelector, profileJob, profileName, popupDeleteSelector, popupAvatarSelector, avatarSelector, profileImage} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section }  from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api';
import './index.css';

let userId
api.getProfile()
    .then(res =>{
        userInformation.setUserInfo(res.name, res.about, res.avatar)
        userId = res._id;
    })
api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const card = createCard(data);
            cardsDefault.addItem(card);
        })
    })

const profileFormValidator = new FormValidator(config, profileForm);
const cardFormValidator = new FormValidator(config, cardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


const userInformation = new UserInfo({userNameSelector: profileName, userCaptionSelector: profileJob, userAvatarSelector: avatarSelector})


const profileFormPopup = new PopupWithForm(popupProfileSelector, {
  submitFormHandler: ()=> {
    const values = profileFormPopup.getInputValues();
    api.editProfile(values.name, values.caption)
        .then(res => {
            userInformation.setUserInfo(values.name, values.caption, res.avatar);
        });
    profileFormPopup.renderLoading(true);
    profileFormPopup.close();
  }
})
profileFormPopup.setEventListeners();


openButton.addEventListener('click', ()=> {
  profileFormPopup.open();
  profileFormPopup.renderLoading(false);
  const info = userInformation.getUserInfo();
  nameInput.value = info.name;
  captionInput.value = info.caption;

  profileFormValidator.resetValidation();

});




openCardButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardFormPopup.open();
  cardFormPopup.renderLoading(false);
});

const cardFormPopup = new PopupWithForm (
  popupCardSelector,
  {submitFormHandler: () => {
      const values = cardFormPopup.getInputValues();
      api.addCard(values.name, values.link)
          .then(res => {
              const newCard = createCard(res, cardTemplateSelector);
              cardsDefault.addItem(newCard);
          });
      cardFormPopup.renderLoading(true);
      cardFormPopup.close();
      cardFormValidator.disableButton();
   }
  });

cardFormPopup.setEventListeners();



const imgPopup = new PopupWithImage(popupImgSelector);
imgPopup.setEventListeners();

const deletePopup = new PopupWithForm(popupDeleteSelector, {})
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm(popupAvatarSelector,
    {submitFormHandler: () =>
{
    const values = avatarPopup.getInputValues();
    console.log(values)
    api.updateAvatar(values.avatar)
        .then(res => {
           userInformation.setUserInfo(res.name, res.about, res.avatar)
        });
    avatarPopup.renderLoading(true);
    avatarPopup.close();
}
});
avatarPopup.setEventListeners();

profileImage.addEventListener('click', () => {
    avatarPopup.open();
    avatarPopup.renderLoading(false);
})


const cardsDefault = new Section(
  {items: [],
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
  }, (id) => {
      deletePopup.open();

      deletePopup.changeHandler(() => {
          api.deleteCard(id)
              .then(res => {
                  card.deleteCard();
                  deletePopup.close();
              })
      })
  }, userId,
      (id) =>{
      if (card.isLiked()) {
          api.deleteLike(id)
              .then(res => {
                  card.setLikes(res.likes)
              })
      }
      else {
          api.addLike(id)
              .then(res => {
                  card.setLikes(res.likes)
              })
      }

      });
  const cardElement = card.getCardElement();
  return cardElement
};