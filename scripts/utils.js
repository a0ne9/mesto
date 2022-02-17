export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escClose);
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escClose);
};

function escClose(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    }
}