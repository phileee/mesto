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

import {openerProfile, adderCard, userNameElement, descriptionElement, formProfile, formCard, linkAvatar, formAvatar, openerAvatarForm, selectorArray} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '0d2eecbb-594d-452a-9a65-7b12cb43fb8e',
    'Content-Type': 'application/json'
  }
}); 

let userId;
let createCard;

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
  const card = new Card(data, '#template-element', handleCardClick, handleCardConfirmation, api, userId);
  const cardElement = card.createCard();
  return cardElement;
}


const userInformation = new UserInfo({name: '.profile__name', info: '.profile__prename' , avatar : linkAvatar});

Promise.all([api.getInitialCards(), api.getInitialUser()])
  .then(([initialCards, intialUser]) => {
    createCard = new Section(
      {
        items: initialCards,
        renderer: renderCard
      },
      '.elements'
    );

    userInformation.setUserInfo({name: intialUser.name, info: intialUser.about, avatar: intialUser.avatar});
    userId = intialUser._id;

    createCard.renderItems();

  })
  .catch((err) => {
    console.log(err);
  });




const popupConfirmation = new PopupWithConfirmation('#popup-confirm');
popupConfirmation.setEventListeners(api);

function handleCardConfirmation(element, id) {
  popupConfirmation.open(element, id);
}




const popupAddCard = new PopupWithForm('#popup-card', (data) => {
  popupAddCard.renderLoading(true);
  api.addCard(data.name, data.link)
    .then((res) => {
      createCard.setItemPrepend(renderCard(res));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false, 'Создать');
    })
});

popupAddCard.setEventListeners();


const popupProfile = new PopupWithForm('#popup-profile', (data) => {
  popupProfile.renderLoading(true);
  api.setUser(data.name, data.info)
    .then((res) => {
      userInformation.setUserInfo({name: res.name, info: res.about, avatar: res.avatar});
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
  });

popupProfile.setEventListeners();


const popupAvatar = new PopupWithForm('#popup-avatar', (data) => {
  popupAvatar.renderLoading(true);
  api.setAvatar(data.link)
    .then((res) => {
      linkAvatar.src = res.avatar;
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
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

