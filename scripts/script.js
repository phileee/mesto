let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profilePrename = document.querySelector('.profile__prename');

let popupUsername = document.querySelector('#popup-username');
let popupDescription = document.querySelector('#popup-description');

let formElement = document.querySelector('.popup__form');

function closePopupOpened() {
  popup.classList.remove('popup_opened');
}

openPopup.addEventListener('click', function() {
  popupUsername.value = profileName.textContent;
  popupDescription.value = profilePrename.textContent;
  popup.classList.add('popup_opened');
});

closePopup.addEventListener('click', function() {
  closePopupOpened()
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupUsername.value;
  profilePrename.textContent = popupDescription.value;
  closePopupOpened()
}

formElement.addEventListener('submit', formSubmitHandler);
