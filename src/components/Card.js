export default class Card {
  constructor({ data, handleCardClick, handleCardDelete, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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
    this.userCard
      ? this._deleteButton.addEventListener('click', () => this._handleCardDelete(this._cardId))
      : this._deleteButton.remove();

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  handleToggleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  setCountLikes(number) {
    this._likeCounter.textContent = number;
  }

  removeCard() {
    this._element.remove();

    this._element = null;
  }

  checkUserLike(userId) {
    this.userLike = this._likes.some(like => {
      return like._id === userId;
    });
  }

  checkUserCard(userId) {
    this.userCard = this._ownerId === userId;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardDescription = this._element.querySelector('.card__description');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');

    this._cardDescription.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.setCountLikes(this._likes.length)

    if (this.userLike) {
      this.handleToggleLikeButton()
    }

    this._setEventListeners();

    return this._element;
  }
}
