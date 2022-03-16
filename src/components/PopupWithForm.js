import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler} ) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.popup__button');
    this._text = this._button.textContent
  };

  getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
        this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  changeHandler(newHandler) {
    this._submitFormHandler = newHandler;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitFormHandler();
    })
  };

  renderLoading(isloading) {
    if (isloading) {
      this._button.textContent = ('Сохранение...');
    }
    else{
      this._button.textContent = this._text;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
};