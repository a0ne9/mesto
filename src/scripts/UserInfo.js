export class UserInfo {
  constructor({userNameSelector, userCaptionSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userCaption = document.querySelector(userCaptionSelector);
    this._nameInput = document.querySelector('#name-field')
    this._captionInput = document.querySelector('#job-field')
  }

  getUserInfo() {

    return {
      name: this._userName.textContent,
      caption: this._userCaption.textContent
    }
  };

  fillInputs({name, caption}) {
    this._nameInput.value = name;
    this._captionInput.value = caption;
  }

  setUserInfo({name, caption}) {
    

    this._userName.textContent = name;
    this._userCaption.textContent = caption;

  }
    
};
