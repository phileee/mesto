import {Card} from './Card.js';
import {initialCards} from './array.js';
import {FormValidator} from './FormValidator.js';

const popupProfile = document.querySelector('#popup-profile');
const openerProfile = document.querySelector('.profile__edit-button');
const closerProfile = popupProfile.querySelector('#profile-close');
const profileName = document.querySelector('.profile__name');
const profilePrename = document.querySelector('.profile__prename');
const usernameElement = document.querySelector('#popup-username');
const descriptionElement = document.querySelector('#popup-description');
const formProfile = document.querySelector('#popup-form-profile');

const adderCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('#popup-card');
const closerCard = document.querySelector('#card-close');
const cardName = document.querySelector('#card-name');
const cardUrl = document.querySelector('#card-url');
const formCard = document.querySelector('#popup-form-card');

export const popupFigure = document.querySelector('#popup-figure');
const closerFigure = document.querySelector('#image-close');
export const figureImage = popupFigure.querySelector('.popup__figure-image');
export const figureCaption = popupFigure.querySelector('.popup__figure-caption');

const elementCards = document.querySelector('.elements');

const buttonSubmit = popupCard.querySelector('.popup__button');

const selectorArray = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

const formList = Array.from(document.querySelectorAll(selectorArray.formSelector));

formList.forEach((formElement) => {
    const formValidator = new FormValidator(selectorArray, formElement);
    formValidator.enableValidation();
});

function resetSubmitButton() {
  buttonSubmit.classList.add('popup__button_disabled');
  buttonSubmit.setAttribute("disabled", "disabled");
}


function renderCard(item, template) {
  const card = new Card(item, template);
  const cardElement = card.createCard();
  elementCards.prepend(cardElement);
}

initialCards.forEach(function (card) {
  renderCard(card, '#template-element')
});


function closePopup(elementDOM) {
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", closeByOverlay);
  elementDOM.classList.remove('popup_opened');
}

export function openPopup(elementDOM) {
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("mousedown", closeByOverlay);
  elementDOM.classList.add('popup_opened');
}


openerProfile.addEventListener('click', function() {
  usernameElement.value = profileName.textContent;
  descriptionElement.value = profilePrename.textContent;
  openPopup(popupProfile);
});

closerProfile.addEventListener('click', function() {
  closePopup(popupProfile);
});

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = usernameElement.value;
  profilePrename.textContent = descriptionElement.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', formProfileSubmitHandler);


adderCard.addEventListener('click', function() {
  openPopup(popupCard);
});

closerCard.addEventListener('click', function() {
  closePopup(popupCard);
});

function formCardSubmitHandler(evt) {
  evt.preventDefault();

  const elCard = {};
  elCard.name= cardName.value;
  elCard.link = cardUrl.value;
  renderCard(elCard, "#template-element");
  
  cardName.value = "";
  cardUrl.value = "";
  resetSubmitButton();

  closePopup(popupCard);
}

formCard.addEventListener('submit', formCardSubmitHandler);

closerFigure.addEventListener("click", function () {
  closePopup(popupFigure);
});


function closeByOverlay(evt) {
  if (evt.target === evt.target.closest(".popup")) {
    closePopup(evt.target.closest(".popup"));
  }
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}