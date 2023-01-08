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

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const formPopup = popup.querySelector('.popup__form');
const nameInput = formPopup.querySelector('.popup__input_value_name');
const jobInput = formPopup.querySelector('.popup__input_value_job');
const cards = document.querySelector('.cards');

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
  const copyTemplateCards = document.querySelector('#template-cards').content.cloneNode(true);
  const card = copyTemplateCards.querySelector('.card');
  const cardDescription = copyTemplateCards.querySelector('.card__description');
  const cardImage = copyTemplateCards.querySelector('.card__image');
  const deleteButton = copyTemplateCards.querySelector('.card__delete-button');
  const likeButton = copyTemplateCards.querySelector('.card__like-button');

  cardDescription.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  deleteButton.addEventListener('click', () => card.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

  cards.append(copyTemplateCards);
}

initialCards.forEach(renderCard);
