import { openPopup } from './utils.js';
import { popupImage, popupImageCaption, popupImageImg } from './constants.js';
export class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.cards__list-item');
  };

   
  _setListeners() {
    this._likeButton.addEventListener('click', this._handleLikeIcon);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardImage.addEventListener('click', () => {
        this._handleImagePopup();
    });
  };

  

  _handleLikeIcon(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  };

  _handleDeleteButton(evt) {
    evt.target.closest('.cards__list-item').remove();
  };

  _fillCard() {
    this._cardElement.querySelector('.cards__title').textContent = this._data.name;
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
};

  _handleImagePopup() {
    openPopup(popupImage);
    console.log(this);
    popupImageCaption.textContent = this._data.name;
    popupImageImg.src = this._data.link;
    popupImageImg.alt = this._data.name;
  };

  getCardElement () {
    this._cardElement = this._template.cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._deleteButton = this._cardElement.querySelector('.cards__delete-button');
    this._cardImage = this._cardElement.querySelector('.cards__image');
    this._fillCard();
    this._setListeners();
    return this._cardElement;
  };
};