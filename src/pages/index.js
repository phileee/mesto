import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {initialCards} from '../utils/array.js';

import {openerProfile, adderCard, userNameElement, descriptionElement, formProfile, formCard, selectorArray} from '../utils/constants.js';


const formValidatorProfile = new FormValidator(selectorArray, formProfile);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(selectorArray, formCard);
formValidatorCard.enableValidation();


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
  const card = new Card(data, '#template-element', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}


const createCard = new Section(
  {
    items: initialCards,
    renderer: renderCard
  },
  '.elements'
);

createCard.renderItems();


const userInformation = new UserInfo({name: '.profile__name', info: '.profile__prename'});


const popupAddCard = new PopupWithForm('#popup-card', (data) => {
  createCard.setItemPrepend(renderCard(data));
});

popupAddCard.setEventListeners();


const popupProfile = new PopupWithForm('#popup-profile', (data) => {
  userInformation.setUserInfo(data);
});

popupProfile.setEventListeners();


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