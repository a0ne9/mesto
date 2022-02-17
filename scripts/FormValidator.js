export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputsList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  };

  _showInputError( inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };
  
  _hideInputError( inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.InputErrorClass);
    errorElement.classList.remove(this._settings.ErrorClass);
    errorElement.textContent = '';
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
        this.disableButton();
    } else {
        this._enableButton();
    }
  }; 

  _isValid( inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  clearErrors(popup) {
    const spans = popup.querySelectorAll('.popup__error_visible');
    spans.forEach((element) => {
      element.textContent = ""
      element.classList.remove('popup__error_visible');
    });
    const inputs = popup.querySelectorAll('.popup__input_type_error');
    inputs.forEach((element) => {
      element.classList.remove('popup__input_type_error');
    });
  };

  clearForm(form) {
    const inputs = form.querySelectorAll('.popup__input');
    inputs.forEach((input) => {
      input.value = ""
    });
  };

  _hasInvalidInput = () => {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
   };

  _enableButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };
  


  _setEventListeners() {
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid( inputElement);
        this._toggleButtonState();
      });
    });
  };
  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    };
  
};
