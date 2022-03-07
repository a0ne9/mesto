export class UserInfo {
  constructor({userNameSelector, userCaptionSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userCaption = document.querySelector(userCaptionSelector);
  }

  getUserInfo() {

    return {
      name: this._userName.textContent,
      caption: this._userCaption.textContent
    }
  };


  setUserInfo({name, caption}) {
    

    this._userName.textContent = name;
    this._userCaption.textContent = caption;

  }
    
};
