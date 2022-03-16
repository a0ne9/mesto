export class Card {
  constructor(data, cardTemplateSelector, {handleCardClick}, handleDeleteClick, id, handleLikeClick) {
    this._data = data;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.cards__list-item');
    this._handleCardClick = handleCardClick;
    this._likes = this._data.likes;
    this._id = this._data._id;
    this._handleDeleteClick = handleDeleteClick;
    this._ownerId = this._data.owner._id;
    this._userId = id;
    this._handleLikeClick = handleLikeClick;
  };

   
  _setListeners() {
    this._likeButton.addEventListener('click', () => {this._handleLikeClick(this._id)});
    this._deleteButton.addEventListener('click', () => {this._handleDeleteClick(this._id)});
    this._cardImage.addEventListener('click', this._handleCardClick);
  };

  

  _fillLikeIcon() {
    this._cardElement.querySelector('.cards__like-button').classList.add('cards__like-button_active');
  };

  _clearLikeIcon() {
    this._cardElement.querySelector('.cards__like-button').classList.remove('cards__like-button_active');
  };

  deleteCard(evt) {
    //evt.target.closest('.cards__list-item').remove();
    this._cardElement.remove();
    this._cardElement = null;
  };

  _fillCard() {
    this._cardElement.querySelector('.cards__title').textContent = this._data.name;
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
  };

  isLiked() {
    const hostLiked = this._likes.find(user => user._id === this._userId)
    return hostLiked
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._cardElement.querySelector('.cards__like-counter');
    likeCountElement.textContent = this._likes.length;
    if (this.isLiked()) {
      this._fillLikeIcon();
    }
    else {
      this._clearLikeIcon();
    }
  };

  getCardElement () {
    this._cardElement = this._template.cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._deleteButton = this._cardElement.querySelector('.cards__delete-button');
    this._cardImage = this._cardElement.querySelector('.cards__image');
    this._fillCard();
    this._setListeners();
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector('.cards__delete-button').style.display = 'none'
    }


    return this._cardElement;
  };
};