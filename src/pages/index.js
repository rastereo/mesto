import '../pages/index.css';

import {
  editButton,
  addButton,
  popupEditProfileForm,
  popupAddImageForm
} from '../utils/constants.js';

import { initialCards } from '../utils/initialCards.js';
import { formValidationConfig } from '../utils/formValidationConfig.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
})

const formValidatorEditProfile = new FormValidator(formValidationConfig, popupEditProfileForm);
const formValidatorAddImage = new FormValidator(formValidationConfig, popupAddImageForm);

formValidatorEditProfile.enableValidation();
formValidatorAddImage.enableValidation();

function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupWhithImage.open(name, link);
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

const popupWhithImage = new PopupWithImage('.popup_name_image');

popupWhithImage.setEventListeners();

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
