const initialCards = [
  {
    name: 'Вестминстерский дворец',
    link: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Барселона',
    link: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Никола-Ленивец',
    link: 'https://images.unsplash.com/photo-1566206894999-0a88a04a1665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Рига',
    link: 'https://images.unsplash.com/photo-1566935571405-4b1faed95ee4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Тбилиси',
    link: 'https://images.unsplash.com/photo-1562392249-582170da5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1506261423908-ea2559c1f24c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cards = document.querySelector('.cards');
const popupEditProfile = document.querySelector('.popup_name_edit-profile');
const EditProfileForms = popupEditProfile.querySelector('.popup__form');
const EditProfileSaveButton = popupEditProfile.querySelector('.popup__save-button');
const EditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddImage = document.querySelector('.popup_name_add-image');
const AddImageForms = popupAddImage.querySelector('.popup__form');
const AddImageSaveButton = popupAddImage.querySelector('.popup__save-button');
const AddImageCloseButton = popupAddImage.querySelector('.popup__close-button');
const popupImage = document.querySelector('.popup_name_image');
const photo = popupImage.querySelector('.popup__photo');
const caption = popupImage.querySelector('.popup__caption');
const imageCloseButton = popupImage.querySelector('.popup__close-button');

function renderProfileImages() {
  cards.innerHTML = '';
  initialCards.forEach(addCard);
}

renderProfileImages();

function renderPopupInputs() {
  EditProfileForms.name.value = profileName.textContent;
  EditProfileForms.job.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = EditProfileForms.name.value;
  profileJob.textContent = EditProfileForms.job.value;
}

function renderPopupImage(card) {
  photo.src = card.link;
  photo.alt = card.name;
  caption.textContent = card.name;
}

function actionPopupEditProfile() {
  popupEditProfile.classList.toggle('popup_opened');
  if (popupEditProfile.classList.contains('popup_opened')) {
    renderPopupInputs();
  }
}

function actionPopupAddImage() {
  popupAddImage.classList.toggle('popup_opened');
}

function actionPopupImage() {
  popupImage.classList.toggle('popup_opened');
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();
  renderProfileInfo();
  actionPopupEditProfile();
}

function addImageToProfile(evt) {
  evt.preventDefault();

  const cardObject = new Object();

  cardObject.name = AddImageForms.description.value;
  cardObject.link = AddImageForms.link.value;

  initialCards.unshift(cardObject);

  renderProfileImages();
  actionPopupAddImage();

  AddImageForms.description.value = '';
  AddImageForms.link.value = '';
}

function addCard(item) {
  const copyTemplateCard = document.querySelector('#template-cards').content.cloneNode(true);
  const card = copyTemplateCard.querySelector('.card');
  const cardDescription = card.querySelector('.card__description');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardDescription.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => {
    card.remove();
    initialCards.splice(item, 1);
  });

  cardImage.addEventListener('click', () => {
    actionPopupImage();
    renderPopupImage(item);
  });

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

  cards.append(copyTemplateCard);
}

editButton.addEventListener('click', actionPopupEditProfile);
addButton.addEventListener('click', actionPopupAddImage);
EditProfileSaveButton.addEventListener('click', rewriteProfileInfo);
EditProfileCloseButton.addEventListener('click', actionPopupEditProfile);
AddImageSaveButton.addEventListener('click', addImageToProfile);
AddImageCloseButton.addEventListener('click', actionPopupAddImage);
imageCloseButton.addEventListener('click', actionPopupImage);
