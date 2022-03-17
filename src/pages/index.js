import { FormValidator } from '../components/FormValidator.js';
import { config, captionInput, cardListSelector, cardTemplateSelector, nameInput, openButton, openCardButton, popupCardSelector, popupImgSelector, popupProfileSelector, profileJob, profileName, popupDeleteSelector, popupAvatarSelector, avatarSelector, profileImage, formValidators} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section }  from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api';
import './index.css';

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInformation.setUserInfo(userData.name, userData.about, userData.avatar)
        userId = userData._id;
        cards.forEach(data => {
            const card = createCard(data);
            cardsDefault.addItem(card);
        })
    })
    .catch(err => {
        console.log(err);
    });
/*api.getProfile()
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
    })*/




const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

//const profileFormValidator = new FormValidator(config, profileForm);
//const cardFormValidator = new FormValidator(config, cardForm);
//profileFormValidator.enableValidation();
//cardFormValidator.enableValidation();


const userInformation = new UserInfo({userNameSelector: profileName, userCaptionSelector: profileJob, userAvatarSelector: avatarSelector})


const profileFormPopup = new PopupWithForm(popupProfileSelector, {
  submitFormHandler: ()=> {
    const values = profileFormPopup.getInputValues();
    api.editProfile(values.name, values.caption)
        .then(res => {
            userInformation.setUserInfo(values.name, values.caption, res.avatar);
            profileFormPopup.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() =>{
            profileFormPopup.renderLoading(false);
        })
    profileFormPopup.renderLoading(true);
  }
})
profileFormPopup.setEventListeners();


openButton.addEventListener('click', ()=> {
  profileFormPopup.open();
  const info = userInformation.getUserInfo();
  nameInput.value = info.name;
  captionInput.value = info.caption;
  formValidators['profile-changer'].resetValidation();
});




openCardButton.addEventListener('click', () => {
    formValidators['card-adder'].resetValidation();
  cardFormPopup.open();
  formValidators['card-adder'].disableButton();
});

const cardFormPopup = new PopupWithForm (
  popupCardSelector,
  {submitFormHandler: () => {
      const values = cardFormPopup.getInputValues();
      api.addCard(values.name, values.link)
          .then(res => {
              const newCard = createCard(res, cardTemplateSelector);
              cardsDefault.addItem(newCard);
              cardFormPopup.close();
          })
          .catch(err => {
              console.log(err);
          })
          .finally(() => {
              cardFormPopup.renderLoading(false);
          })
      cardFormPopup.renderLoading(true);


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
           userInformation.setUserInfo(res.name, res.about, res.avatar);
            avatarPopup.close();
        })
        .catch(err => {
        console.log(err);
        })
        .finally(() => {
            avatarPopup.renderLoading(false);
        })
    avatarPopup.renderLoading(true);
}
});
avatarPopup.setEventListeners();

profileImage.addEventListener('click', () => {
    avatarPopup.open();
    formValidators['avatar-adder'].disableButton();
    formValidators['avatar-adder'].resetValidation();
})


const cardsDefault = new Section(
  {items: [],
 }, cardListSelector);



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
              .catch(err => {
                  console.log(err);
              });
      })
  }, userId,
      (id) =>{
      if (card.isLiked()) {
          api.deleteLike(id)
              .then(res => {
                  card.setLikes(res.likes)
              })
              .catch(err => {
                  console.log(err);
              });
      }
      else {
          api.addLike(id)
              .then(res => {
                  card.setLikes(res.likes)
              })
              .catch(err => {
                  console.log(err);
              });
      }

      });
  const cardElement = card.getCardElement();
  return cardElement
};