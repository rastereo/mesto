const initialCards = [
  {
    name: 'Чудак',
    link: 'https://images.unsplash.com/photo-1574158622682-e40e69881006'
  },
  {
    name: 'Шпуня',
    link: 'https://images.unsplash.com/photo-1491485880348-85d48a9e5312'
  },
  {
    name: 'Бутус',
    link: 'https://images.unsplash.com/photo-1513245543132-31f507417b26'
  },
  {
    name: 'Малой',
    link: 'https://images.unsplash.com/photo-1606225457115-9b0de873c5db'
  },
  {
    name: 'Пуговка',
    link: 'https://images.unsplash.com/photo-1548366086-7f1b76106622'
  },
  {
    name: 'Зусик',
    link: 'https://images.unsplash.com/photo-1571988840298-3b5301d5109b'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cards = document.querySelector('.cards');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupInputs = popup.querySelectorAll('.popup__input');
const saveButton = popup.querySelectorAll('.popup__save-button');

function renderpopupInput() {
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

    renderpopupInput();
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
  const imageButton = copyTemplateCards.querySelector('.card__image')

  cardDescription.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => {
    card.remove();
    initialCards.splice(index, 1);
  });

  imageButton.addEventListener('click', () => {
    const popupImage = document.querySelector('.popup-image');
    const image = popupImage.querySelector('.popup-image__photo');
    const caption = popupImage.querySelector('.popup-image__caption');
    const closeImageButton = popupImage.querySelector('.popup-image__close-button');

    popupImage.classList.add('popup-image_opened');

    image.src = item.link;
    image.alt = item.name;
    caption.textContent = item.name;

    closeImageButton.addEventListener('click', () => popupImage.classList.remove('popup-image_opened'));
  });

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

  cards.append(copyTemplateCards);
}

initialCards.forEach(addCard);
