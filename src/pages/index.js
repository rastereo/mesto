import '../pages/index.css';

import {
  avatarButton,
  editButton,
  addButton,
  popupEditProfileForm,
  popupAddImageForm,
  popupUpdateAvatarForm
} from '../utils/constants.js';

import { formValidationConfig } from '../utils/formValidationConfig.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  token: '1e8e583c-6191-4021-ba9a-6679de77025c'
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then(({ name, about, avatar, _id }) => {
    userInfo.setUserInfo({ name, job: about });
    userInfo.setUserAvatar({ name, avatar });
    userInfo.getUserId(_id);
  })
  .catch(err => {
    console.log(err);
  });

const formValidatorEditProfile = new FormValidator(formValidationConfig, popupEditProfileForm);
const formValidatorAddImage = new FormValidator(formValidationConfig, popupAddImageForm);
const formValidatorUpdateAvatar = new FormValidator(formValidationConfig, popupUpdateAvatarForm);

formValidatorEditProfile.enableValidation();
formValidatorAddImage.enableValidation();
formValidatorUpdateAvatar.enableValidation();

function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupWhithImage.open(name, link);
    },
    handleCardDelete: (cardId) => {
      popupDeleteCard.getCallback({
        handleFormSubmit: () => {
          api.deleteCard(cardId)
            .then(() => {
              card.removeCard();

              popupDeleteCard.close();
            })
            .catch(err => {
              console.log(err)
            });
        }
      });

      popupDeleteCard.open();
    },
    handleLikeClick: (cardId) => {
      if (card.userLike) {
        api.deleteLike(cardId)
          .then(result => {
            card.handleToggleLikeButton();
            card.setCountLikes(result.likes.length)

            card.userLike = false;
          })
          .catch(err => {
            console.log(err)
          });
      } else {
        api.putLike(cardId)
          .then(result => {
            card.handleToggleLikeButton();
            card.setCountLikes(result.likes.length)

            card.userLike = true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }, '#template-cards');

  card.checkUserLike(userInfo.id);
  card.checkUserCard(userInfo.id);

  const cardElement = card.generateCard();

  return cardElement;
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');

api.getInitialCards()
  .then(result => {
    cardList.renderItems = result.reverse();

    cardList.rendererItems();
  });

const popupUpdateAvatar = new PopupWithForm({
  handleFormSubmit: (avatar) => {
    popupUpdateAvatar.renderLoading(true);

    api.patchAvatar(avatar.link)
      .then(({ name, avatar }) => {
        userInfo.setUserAvatar({ name, avatar });

        popupUpdateAvatar.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
      });
  }
}, '.popup_name_update-avatar');

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: ({ name, job }) => {
    popupEditProfile.renderLoading(true);

    api.patchUserInfo(name, job)
      .then(({ name, about }) => {
        userInfo.setUserInfo({ name, job: about });

        popupEditProfile.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
}, '.popup_name_edit-profile');

const popupAddImage = new PopupWithForm({
  handleFormSubmit: ({ description, link }) => {
    popupAddImage.renderLoading(true);

    api.postCard(description, link)
      .then(result => {
        cardList.addItem(createCard(result));

        popupAddImage.renderLoading(false)

        popupAddImage.close();
      });
  }
}, '.popup_name_add-image');

const popupWhithImage = new PopupWithImage('.popup_name_image');
const popupDeleteCard = new PopupWithConfirmation('.popup_name_delete-card');

popupUpdateAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddImage.setEventListeners();
popupWhithImage.setEventListeners();
popupDeleteCard.setEventListeners();

avatarButton.addEventListener('click', () => {
  formValidatorUpdateAvatar.resetValidation();

  popupUpdateAvatar.open();
});

editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();

  popupEditProfileForm.name.value = name;
  popupEditProfileForm.job.value = job;

  formValidatorEditProfile.resetValidation();

  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  formValidatorAddImage.resetValidation();

  popupAddImage.open();
});
