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

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const copyTemplateCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return copyTemplateCard;
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._element.remove());
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleToggle());
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._renderPopupImage();

      openPopup(popupImage);
    });
  }

  _handleToggle() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _renderPopupImage() {
    photo.src = this._link;
    photo.alt = this._name;

    caption.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__description').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'));
}

function handleTarget(evt, popup) {
  if (evt.target.classList.contains('popup')) closePopup(popup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  window.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  window.removeEventListener('keydown', handleEscClose);
}

function renderPopupInputs() {
  popupEditProfileForms.name.value = profileName.textContent;
  popupEditProfileForms.job.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = popupEditProfileForms.name.value;
  profileJob.textContent = popupEditProfileForms.job.value;
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();

  renderProfileInfo();
  closePopup(popupEditProfile);
}

function renderCard(item) {
  const card = new Card(item, '#template-cards');

  cardsContainer.prepend(card.generateCard());
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

function renderProfileImages() {
  initialCards.forEach(item => {
    renderCard(item)
  });
}

renderProfileImages();

editButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  renderPopupInputs();
  resetValidation(popupEditProfileForms, formValidationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(popupAddImage)
  resetValidation(popupAddImage, formValidationConfig);
});

popupList.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close-button');

  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (evt) => handleTarget(evt, popup));
});

popupEditProfileForms.addEventListener('submit', rewriteProfileInfo);
popupAddImageForms.addEventListener('submit', addImageToProfile);
