import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler} ) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
        this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFormHandler)
  };
 

  close() {
    super.close();
    this._form.reset();
  }
};