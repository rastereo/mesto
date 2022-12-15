let editButton = document.querySelector('.profile-info__edit-button');
let profileName = document.querySelector('.profile-info__name')
let profileJob = document.querySelector('.profile-info__job')
let likeButton = document.querySelectorAll('.card__like-button')
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formPopup = popup.querySelector('.popup__container');
let nameInput = formPopup.querySelector('.popup__input_name');
let jobInput = formPopup.querySelector('.popup__input_job');
let saveButton = formPopup.querySelector('.popup__save-button');

function renderPopupInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

renderPopupInputs();

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function () {
    likeButton[i].classList.toggle('card__like-button_active')
  });
}

function actionPopup(evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', actionPopup);
closeButton.addEventListener('click', actionPopup);

function rewriteProfileInfo(evt) {
  if (nameInput.value.length !== 0) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    actionPopup(evt);
    nameInput.style.outline = "none"
  } else {
    evt.preventDefault();
    nameInput.style.outline = "2px solid red"
  }
}

saveButton.addEventListener('click', rewriteProfileInfo);
