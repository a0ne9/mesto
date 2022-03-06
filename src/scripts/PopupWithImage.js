import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector('.popup__img');
    this._caption = document.querySelector('.popup__caption');
  };
  
  open(info) {
    this._caption.textContent = info.name;
    this._image.src = info.link;
    this._image.alt = info.name;
    super.open();
  };
};
