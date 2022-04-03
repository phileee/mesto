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

const popupFigure = document.querySelector('#popup-figure');
const closerFigure = document.querySelector('#image-close');
const figureImage = popupFigure.querySelector('.popup__figure-image');
const figureCaption = popupFigure.querySelector('.popup__figure-caption');

const elementCards = document.querySelector('.elements');
const elementCardTemplate = document.querySelector('#template-element').content;

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
  const elementCard = elementCardTemplate.querySelector('.element').cloneNode(true);

  elementCard.querySelector('.element__image').src = initialCollection.link;
  elementCard.querySelector('.element__image').alt = initialCollection.name;
  elementCard.querySelector('.element__caption').textContent = initialCollection.name;
  
  listenerElements(elementCard);

  return elementCard;
}

function renderCard(card, massive) {
  massive.prepend(card);
}

initialCards.forEach(function (card) {
renderCard(createCard(card), elementCards)
});


function closePopup(elementDOM) {
  elementDOM.classList.remove('popup_opened');
}

function openPopup(elementDOM) {
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
  const completedElCard = createCard(elCard);
  renderCard(completedElCard, elementCards);
  
  cardName.value = "";
  cardUrl.value = "";

  closePopup(popupCard);
}

formCard.addEventListener('submit', formCardSubmitHandler);

function listenerElements(element) {
  element.querySelector('.element__trash').addEventListener('click', deleteElement);
  element.querySelector('.element__like').addEventListener('click', likeElement);
  element.querySelector('.element__image').addEventListener('click', figCaption);
}

function deleteElement(evt) {
  const eventTarget = evt.target.closest('.element');
  eventTarget.remove();
}

function likeElement(evt) {
  const heart = evt.target;
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