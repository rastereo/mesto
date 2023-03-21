import '../pages/index.css';

import {
  editButton,
  addButton,
  popupEditProfileForm,
  popupAddImageForm,
  profileAvatar
} from '../utils/constants.js';

import { formValidationConfig } from '../utils/formValidationConfig.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  token: '1e8e583c-6191-4021-ba9a-6679de77025c',
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

api.getUserInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo({ name, job: about });

    profileAvatar.src = avatar;
    profileAvatar.alt = `Аватар ${name}`
  });

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

function renderLoading(isLoading, form) {
  const button = form.querySelector('.popup__save-button')

  isLoading
    ? button.textContent = 'Сохранение...'
    : button.textContent = 'Сохранить'
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');

api.getInitialCards()
  .then(result => {
    cardList.renderItems = result.reverse()

    cardList.rendererItems();
  });

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: ({ name, job }) => {
    renderLoading(true, popupEditProfileForm)

    api.patchUserInfo(name, job)
      .then(() => {
        userInfo.setUserInfo({ name, job });

        popupEditProfile.close();
      })
      .finally(() => {
        renderLoading(false, popupEditProfileForm)
      })
    }
}, '.popup_name_edit-profile')

popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm({
  handleFormSubmit: ({ description, link }) => {
    api.postCard(description, link)
      .then(({ name, link }) => {
        const cardObject = new Object()

        cardObject.name = name;
        cardObject.link = link;

        cardList.addItem(createCard(cardObject));

        popupAddImage.close();
      })
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
