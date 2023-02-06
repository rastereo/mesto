const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsContainer = document.querySelector('.cards');
const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_name_edit-profile');
const popupEditProfileForms = popupEditProfile.querySelector('.popup__form');
const popupEditProfileSaveButton = popupEditProfile.querySelector('.popup__save-button');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddImage = document.querySelector('.popup_name_add-image');
const popupAddImageForms = popupAddImage.querySelector('.popup__form');
const popupAddImageSaveButton = popupAddImage.querySelector('.popup__save-button');
const popupAddImageCloseButton = popupAddImage.querySelector('.popup__close-button');
const popupImage = document.querySelector('.popup_name_image');
const photo = popupImage.querySelector('.popup__photo');
const caption = popupImage.querySelector('.popup__caption');
const imageCloseButton = popupImage.querySelector('.popup__close-button');
const templateCard = document.querySelector('#template-cards');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function keyHandler(evt, popup) {
  if (evt.key === 'Escape') closePopup(popup);
}

function targetHandler(evt, popup) {
  if (evt.target.classList.contains('popup')) closePopup(popup);
}

function renderProfileImages() {
  initialCards.forEach(renderCard);
}

renderProfileImages();

function renderPopupInputs() {
  popupEditProfileForms.name.value = profileName.textContent;
  popupEditProfileForms.job.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = popupEditProfileForms.name.value;
  profileJob.textContent = popupEditProfileForms.job.value;
}

function renderCard(item) {
  const newCard = createCard(item);

  cardsContainer.prepend(newCard);
}

function renderPopupImage(card) {
  photo.src = card.link;
  photo.alt = card.name;
  caption.textContent = card.name;
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();

  renderProfileInfo();
  closePopup(popupEditProfile);
}

function addImageToProfile(evt) {
  evt.preventDefault();

  const cardObject = new Object();

  cardObject.name = popupAddImageForms.description.value;
  cardObject.link = popupAddImageForms.link.value;

  renderCard(cardObject);
  closePopup(popupAddImage);

  popupAddImageForms.reset();
}

function createCard(item) {
  const copyTemplateCard = templateCard.content.cloneNode(true);
  const card = copyTemplateCard.querySelector('.card');
  const cardDescription = card.querySelector('.card__description');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardDescription.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => card.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));
  cardImage.addEventListener('click', () => {
    renderPopupImage(item);
    openPopup(popupImage);
  });

  return copyTemplateCard;
}

editButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  renderPopupInputs();
});

addButton.addEventListener('click', () => openPopup(popupAddImage));

popupList.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close-button');

  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (evt) => targetHandler(evt, popup));
  window.addEventListener('keydown', (evt) => keyHandler(evt, popup));
});

popupEditProfileSaveButton.addEventListener('click', rewriteProfileInfo);
popupAddImageSaveButton.addEventListener('click', addImageToProfile);
