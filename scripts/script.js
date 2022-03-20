const popupProfile = document.querySelector('#popup-profile');
const openProfile = document.querySelector('.profile__edit-button');
const closeProfile = popupProfile.querySelector('#profile-close');
const profileName = document.querySelector('.profile__name');
const profilePrename = document.querySelector('.profile__prename');
const popupUsername = document.querySelector('#popup-username');
const popupDescription = document.querySelector('#popup-description');
const formProfile = document.querySelector('#popup-form-profile');

const addCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('#popup-card');
const closeCard = document.querySelector('#card-close');
const cardName = document.querySelector('#card-name');
const cardUrl = document.querySelector('#card-url');
const formCard = document.querySelector('#popup-form-card');

const popupFigure = document.querySelector('#popup-figure');
const closeFigure = document.querySelector('#image-close');
const figureImage = popupFigure.querySelector('.popup__figure-image');
const figureCaption = popupFigure.querySelector('.popup__figure-caption');

const elementCards = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function createCard(initialCollection) {
  const elementCardTemplate = document.querySelector('#template-element').content;
  const elementCard = elementCardTemplate.querySelector('.element').cloneNode(true);

  elementCard.querySelector('.element__image').src = initialCollection.link;
  elementCard.querySelector('.element__image').alt = initialCollection.name;
  elementCard.querySelector('.element__caption').textContent = initialCollection.name;
  elementCard.querySelector('.element__trash').addEventListener('click', deleteElement);
  elementCard.querySelector('.element__like').addEventListener('click', likeElement);
  elementCard.querySelector('.element__image').addEventListener('click', figCaption);
  elementCards.append(elementCard);
}

initialCards.forEach(function (card) {
createCard(card);
});


function closePopup(selector) {
  selector.classList.remove('popup_opened');
}

function openPopup(selector) {
  selector.classList.add('popup_opened');
}


openProfile.addEventListener('click', function() {
  popupUsername.value = profileName.textContent;
  popupDescription.value = profilePrename.textContent;
  openPopup(popupProfile);
});

closeProfile.addEventListener('click', function() {
  closePopup(popupProfile);
});

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupUsername.value;
  profilePrename.textContent = popupDescription.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', formProfileSubmitHandler);


addCard.addEventListener('click', function() {
  openPopup(popupCard);
});

closeCard.addEventListener('click', function() {
  closePopup(popupCard);
});

function formCardSubmitHandler(evt) {
  evt.preventDefault();

  const elementCardTemplate = document.querySelector('#template-element').content;
  const elCard = elementCardTemplate.querySelector('.element').cloneNode(true);
  
  elCard.querySelector('.element__image').alt = cardName.value;
  elCard.querySelector('.element__image').src = cardUrl.value;
  elCard.querySelector('.element__caption').textContent = cardName.value;
  elCard.querySelector('.element__trash').addEventListener('click', deleteElement);
  elCard.querySelector('.element__like').addEventListener('click', likeElement);
  elCard.querySelector('.element__image').addEventListener('click', figCaption);
  elementCards.prepend(elCard);
  
  cardName.value = "";
  cardUrl.value = "";

  closePopup(popupCard);
}

formCard.addEventListener('submit', formCardSubmitHandler);


function deleteElement(evt) {
  const eventTarget = evt.target.closest('.element');
  eventTarget.remove();
}

function likeElement(evt) {
  const eventTarget = evt.target.closest('.element');
  const heart = eventTarget.querySelector('.element__like');
  heart.classList.toggle('element__like_active');
}


function figCaption(evt) {
  const el = evt.target.closest('.element');
  const figImg = el.querySelector('.element__image');
  const figCap = el.querySelector('.element__caption');
  figureImage.src = figImg.src;
  figureImage.alt = figCap.textContent;
  figureCaption.textContent = figCap.textContent;
  openPopup(popupFigure);
}

closeFigure.addEventListener("click", function () {
  closePopup(popupFigure);
});