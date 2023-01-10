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
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupInputs = popup.querySelectorAll('.popup__input');
const saveButton = popup.querySelectorAll('.popup__save-button');
const cards = document.querySelector('.cards');

function renderpopupInputArrs() {
  popupForm.name.value = profileName.textContent;
  popupForm.job.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = popupForm.name.value;
  profileJob.textContent = popupForm.job.value;
}

function actionPopup(evt) {
  const popupTitle = popup.querySelector('.popup__title');
  const popupInputArr = Array.from(popup.querySelectorAll('.popup__input'));

  popup.classList.toggle('popup_opened');

  popupInputArr.forEach(input => {
    input.value = '';
    input.placeholder = '';
    input.name = '';
  });

  if (evt.target === editButton) {
    popupTitle.textContent = 'Редактировать профиль';
    popupForm.name = 'edit-profile';

    popupInputArr[0].name = 'name';
    popupInputArr[1].name = 'job';

    popupInputArr[1].type = 'text';

    popupInputArr[0].required = true;
    popupInputArr[1].required = false;

    saveButton.id = 'save-profile';

    renderpopupInputArrs();
  } else if (evt.target === addButton) {
    popupTitle.textContent = 'Новое место';
    popupForm.name = 'add-image';

    popupInputArr[0].name = 'description';
    popupInputArr[1].name = 'link';

    popupInputArr[1].type = 'url';

    popupInputArr[0].placeholder = 'Название';
    popupInputArr[1].placeholder = 'Ссылка на картинку';

    popupInputArr[0].required = false;
    popupInputArr[1].required = true;

    saveButton.id = 'save-image';
  }
}

function rewritePage(evt) {
  evt.preventDefault();

  if (saveButton.id === 'save-profile') {
    renderProfileInfo();
  } else if (saveButton.id === 'save-image') {
    cardObject = new Object();

    cardObject.name = popupForm.description.value;
    cardObject.link = popupForm.link.value;

    cards.innerHTML = '';

    initialCards.unshift(cardObject);
    initialCards.forEach(addCard);
  }

  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', actionPopup);
addButton.addEventListener('click', actionPopup);
closeButton.addEventListener('click', actionPopup);
popupForm.addEventListener('submit', rewritePage);

function addCard (item, index) {
  const copyTemplateCards = document.querySelector('#template-cards').content.cloneNode(true);
  const card = copyTemplateCards.querySelector('.card');
  const cardDescription = copyTemplateCards.querySelector('.card__description');
  const cardImage = copyTemplateCards.querySelector('.card__image');
  const deleteButton = copyTemplateCards.querySelector('.card__delete-button');
  const likeButton = copyTemplateCards.querySelector('.card__like-button');

  cardDescription.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => {
    card.remove();
    initialCards.splice(index, 1);
  });

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

  cards.append(copyTemplateCards);
}

initialCards.forEach(addCard);
