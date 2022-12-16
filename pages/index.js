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

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function () {
    likeButton[i].classList.toggle('card__like-button_active')
  });
}

function renderPopupInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function renderProfileInfo() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function actionPopup(evt) {
  evt.preventDefault();
  renderPopupInputs();
  popup.classList.toggle('popup_opened');
  nameInput.style.outline = "none"
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();
  renderProfileInfo();
  actionPopup(evt);
}

editButton.addEventListener('click', actionPopup);
closeButton.addEventListener('click', actionPopup);
saveButton.addEventListener('click', rewriteProfileInfo);
