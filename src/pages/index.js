import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

import {openerProfile, adderCard, userNameElement, descriptionElement, formProfile, formCard, formAvatar, openerAvatarForm, selectorArray} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '0d2eecbb-594d-452a-9a65-7b12cb43fb8e',
    'Content-Type': 'application/json'
  }
}); 


const formValidatorProfile = new FormValidator(selectorArray, formProfile);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(selectorArray, formCard);
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(selectorArray, formAvatar);
formValidatorAvatar.enableValidation();


const figureImage = new PopupWithImage({
  popupSelector: '#popup-figure',
  figImg: '.popup__figure-image',
  figCap: '.popup__figure-caption'
});

figureImage.setEventListeners();


function handleCardClick(name, link) {
  figureImage.open(name, link);
};

function renderCard(data) {
  const card = new Card(data, '#template-element', handleCardClick, handleCardConfirmation);
  const cardElement = card.createCard();
  return cardElement;
}

let createCard;
api.getInitialCards().then((data) => {
  createCard = new Section(
    {
      items: data,
      renderer: renderCard
    },
    '.elements'
  );
  createCard.renderItems();
}).catch((err) => {
  console.log(err);
});


const userInformation = new UserInfo({name: '.profile__name', info: '.profile__prename'});


function handleCardConfirmation(element) {
  const popupConfirmation = new PopupWithConfirmation('#popup-confirm', element);
  popupConfirmation.setEventListeners();
  popupConfirmation.open();
}


const popupAddCard = new PopupWithForm('#popup-card', (data) => {
  createCard.setItemPrepend(renderCard(data));
  popupAddCard.close();
});

popupAddCard.setEventListeners();


const popupProfile = new PopupWithForm('#popup-profile', (data) => {
  userInformation.setUserInfo(data);
  popupProfile.close();
});

popupProfile.setEventListeners();


const popupAvatar = new PopupWithForm('#popup-avatar', (data) => {
  popupAvatar.close();
});

popupAvatar.setEventListeners();


openerProfile.addEventListener('click', () => {
  const getUserObj = userInformation.getUserInfo();

  userNameElement.value = getUserObj.name;
  descriptionElement.value = getUserObj.info;

  popupProfile.open();
  formValidatorProfile.resetValidation();
});

adderCard.addEventListener('click', () => {
  formValidatorCard.resetValidation();
  popupAddCard.open();
});

openerAvatarForm.addEventListener('click', () => {
  formValidatorAvatar.resetValidation();
  popupAvatar.open();
})

