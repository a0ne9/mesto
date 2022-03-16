export class UserInfo {
  constructor({userNameSelector, userCaptionSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userCaption = document.querySelector(userCaptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {

    return {
      name: this._userName.textContent,
      caption: this._userCaption.textContent
    }
  };


  setUserInfo(name, description, avatar) {
    

    this._userName.textContent = name;
    this._userCaption.textContent = description;
    this._userAvatar.src = avatar;
  }
    
};
