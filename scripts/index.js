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

let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formPopup = popup.querySelector('.popup__form');
let nameInput = formPopup.querySelector('.popup__input_value_name');
let jobInput = formPopup.querySelector('.popup__input_value_job');

function renderPopupInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function actionPopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    renderPopupInputs();
  }
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();
  renderProfileInfo();
  actionPopup();
}

editButton.addEventListener('click', actionPopup);
closeButton.addEventListener('click', actionPopup);
formPopup.addEventListener('submit', rewriteProfileInfo);

function renderCard (item) {
  const cards = document.querySelector('.cards');
  const copyTemplateCards = document.querySelector('#template-cards').content.cloneNode(true);
  const card = copyTemplateCards.querySelector('.card');

  copyTemplateCards.querySelector('.card__description').textContent = item.name;
  copyTemplateCards.querySelector('.card__image').src = item.link;
  copyTemplateCards.querySelector('.card__image').alt = item.name;
  copyTemplateCards.querySelector('.card__delete-button').addEventListener('click', () => card.remove());

  cards.append(copyTemplateCards);
}

initialCards.forEach(renderCard);
