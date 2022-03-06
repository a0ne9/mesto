export class Popup {
  constructor (popupSelector) {
  this._popup = document.querySelector(popupSelector);
  }  

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  };

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  };

  _clickClose =(evt)=> {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
      
    }
  };

  _handleButton = (evt) => {
    if (evt.target.classList.contains('close-button')) {
      this.close();
    }
  };


  setEventListeners() {
    this._popup.addEventListener('click', this._clickClose);
    const closeButton  = this._popup.querySelector('.close-button');
    closeButton.addEventListener('click', this._handleButton);
    document.addEventListener('keydown', this._handleEscClose);
  };

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._clickClose);
  }
};
