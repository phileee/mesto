let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profilePrename = document.querySelector('.profile__prename');

let popupUsername = document.querySelector('.popup__username');
let popupDescription = document.querySelector('.popup__description');

let formElement = document.querySelector('.popup__form');

openPopup.addEventListener('click', function() {
  popupUsername.value = profileName.textContent;
  popupDescription.value = profilePrename.textContent;
  popup.classList.add('popup_opened');
});

closePopup.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupUsername.value;
  profilePrename.textContent = popupDescription.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
