import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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
const popupEditProfileForm = document.querySelector('.popup_name_edit-profile').querySelector('.popup__form');
const popupAddImageForm = document.querySelector('.popup_name_add-image').querySelector('.popup__form');

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' })
const formValidatorEditProfile = new FormValidator(formValidationConfig, popupEditProfileForm);
const formValidatorAddImage = new FormValidator(formValidationConfig, popupAddImageForm);

formValidatorEditProfile.enableValidation();
formValidatorAddImage.enableValidation();

function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      const popupWhithImage = new PopupWithImage({ name, link }, '.popup_name_image');

      popupWhithImage.setEventListeners();
      popupWhithImage.open();
    }
  }, '#template-cards');

  const cardElement = card.generateCard();

  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');

cardList.renderItems();

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: ({ name, job }) => {
    userInfo.setUserInfo({ name, job });

    popupEditProfile.close();
  }
}, '.popup_name_edit-profile')

popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm({
  handleFormSubmit: ({ description, link }) => {
    const cardObject = new Object()

    cardObject.name = description;
    cardObject.link = link;

    cardList.addItem(createCard(cardObject));

    popupAddImage.close();
  }
}, '.popup_name_add-image');

popupAddImage.setEventListeners();

editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()

  popupEditProfileForm.name.value = name;
  popupEditProfileForm.job.value = job;

  formValidatorEditProfile.resetValidation();

  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  formValidatorAddImage.resetValidation();

  popupAddImage.open();
});
