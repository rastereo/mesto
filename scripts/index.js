import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

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
const cardsContainer = document.querySelector('.cards');
const popupEditProfileSelector = document.querySelector('.popup_name_edit-profile');
const popupEditProfileForm = popupEditProfileSelector.querySelector('.popup__form');
const popupAddImageSelector = document.querySelector('.popup_name_add-image');
const popupAddImageForm = popupAddImageSelector.querySelector('.popup__form');
const popupImageSelector = document.querySelector('.popup_name_image');

const formValidatorEditProfile = new FormValidator(formValidationConfig, popupEditProfileForm);
const formValidatorAddImage = new FormValidator(formValidationConfig, popupAddImageForm);

formValidatorEditProfile.enableValidation();
formValidatorAddImage.enableValidation();

function renderPopupInputs() {
  popupEditProfileForm.name.value = profileName.textContent;
  popupEditProfileForm.job.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = popupEditProfileForm.name.value;
  profileJob.textContent = popupEditProfileForm.job.value;
}

function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      const popupWhithImage = new PopupWithImage({ name, link }, popupImageSelector);

      popupWhithImage.setEventListeners();
      popupWhithImage.open();
    }
  }, '#template-cards');

  const cardElement = card.generateCard();

  return cardElement;
}

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: () => {
    renderProfileInfo();

    popupEditProfile.close();
  }
}, popupEditProfileSelector)

popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm({
  handleFormSubmit: ({ description, link }) => {
    const cardObject = new Object()

    cardObject.name = description;
    cardObject.link = link;

    cardList.addItem(createCard(cardObject));

    popupAddImage.close();
  }
}, popupAddImageSelector);

popupAddImage.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsContainer);

cardList.renderItems();

editButton.addEventListener('click', () => {
  popupEditProfile.open();

  renderPopupInputs();

  formValidatorEditProfile.resetValidation();
});

addButton.addEventListener('click', () => {
  popupAddImage.open();

  formValidatorAddImage.resetValidation();
});
