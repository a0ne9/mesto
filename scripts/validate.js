
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClass);
  errorElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};





const hasInvalidInput = (inputsList) => {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

const toggleButtonState = (inputsList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputsList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
}; 

const isValid = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    } else {
      hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
};

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest);
      toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
    });
  });
}; 

const clearErrors = () => {
  const spans = Array.from(document.querySelectorAll('.popup__error_visible'));
  spans.forEach((element) => {
    element.textContent = "";
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 