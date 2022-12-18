let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formPopup = popup.querySelector('.popup__form');
let nameInput = formPopup.querySelector('.popup__input_value_name');
let jobInput = formPopup.querySelector('.popup__input_value_job');

function renderPopupInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

renderPopupInputs()

function renderProfileInfo() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function actionPopup() {
  if (popup.classList.contains('popup_opened')) {
    renderPopupInputs();
    popup.classList.remove('popup_opened');
  } else {
    popup.classList.add('popup_opened');
  }
}

function rewriteProfileInfo(evt) {
  evt.preventDefault();
  renderProfileInfo();
  actionPopup();
}

editButton.addEventListener('click', actionPopup);
closeButton.addEventListener('click', actionPopup);
formPopup.addEventListener('submit', rewriteProfileInfo);
