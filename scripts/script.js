let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');

openPopup.addEventListener('click', function() {
  popup.classList.add('popup_opened')
});

closePopup.addEventListener('click', function() {
  popup.classList.remove('popup_opened')
});

