import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

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

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_name_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddImage = document.querySelector('.popup_name_add-image');
const popupAddImageForm = popupAddImage.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_name_image');

const cardsSelector = '.cards';

const formValidatorEditProfile = new FormValidator(formValidationConfig, popupEditProfileForm);
const formValidatorAddImage = new FormValidator(formValidationConfig, popupAddImageForm);

function handleEscClose(evt) {
  if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'));
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
  popupEditProfileForm.name.value = profileName.textContent;
  popupEditProfileForm.job.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = popupEditProfileForm.name.value;
  profileJob.textContent = popupEditProfileForm.job.value;
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();

  renderProfileInfo();
  closePopup(popupEditProfile);
}

function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      const popupWhithImage = new PopupWithImage({ name, link }, popupImage);

      popupWhithImage.open();
    }
  }, '#template-cards');

  const cardElement = card.generateCard();

  return cardElement;
}

function addImageToProfile(evt) {
  evt.preventDefault();

  const cardObject = new Object();

  cardObject.name = popupAddImageForm.description.value;
  cardObject.link = popupAddImageForm.link.value;

  cardList.addItem(createCard(cardObject));

  closePopup(popupAddImage);

  popupAddImageForm.reset();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsSelector);

cardList.renderItems();

formValidatorEditProfile.enableValidation();
formValidatorAddImage.enableValidation();

editButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  renderPopupInputs();

  formValidatorEditProfile.resetValidation();
});

addButton.addEventListener('click', () => {
  openPopup(popupAddImage);

  formValidatorAddImage.resetValidation();
});

popupList.forEach(item => {
  const popup = new Popup(item);

  popup.setEventListeners();
});

popupEditProfileForm.addEventListener('submit', rewriteProfileInfo);
popupAddImageForm.addEventListener('submit', addImageToProfile);
