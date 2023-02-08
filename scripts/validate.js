const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function makeInvalidInput(input, config) {
  input.classList.add(config);
}

function removeInvalidInput(input, config) {
  input.classList.remove(config);
}

function showErrorMessage(error, config, input) {
  error.classList.add(config);
  error.textContent = input.validationMessage;
}

function hideErrorMessage(error, config) {
  error.classList.remove(config);
  error.textContent = '';
}

function toggleInputValidation(input, error, config) {
  if (!input.validity.valid) {
    makeInvalidInput(input, config.inputErrorClass);
    showErrorMessage(error, config.errorClass, input);
  } else {
    removeInvalidInput(input, config.inputErrorClass);
    hideErrorMessage(error, config.errorClass);
  }
}

function checkInputsInvalid(arr) {
  return arr.some(input => {
    return !input.validity.valid;
  });
}

function addDisabledSubmit(submit, config) {
  submit.disabled = true;
  submit.classList.add(config);
}

function removeDisabledSubmit(submit, config) {
  submit.disabled = false;
  submit.classList.remove(config);
}

function toggleDisabledSubmit(inputArr, submit, config) {
  if (checkInputsInvalid(inputArr)) {
    addDisabledSubmit(submit, config);
  } else {
    removeDisabledSubmit(submit, config);
  }
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
      const errorMessage = form.querySelector(`.popup__error_name_${input.name}`);

      input.addEventListener('input', () => {
        toggleInputValidation(input, errorMessage, config);
        toggleDisabledSubmit(inputList, submitButton, config.inactiveButtonClass);
      });
    });
  });
}

function resetValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach(input => {
    const errorMessage = form.querySelector(`.popup__error_name_${input.name}`);

    removeInvalidInput(input, config.inputErrorClass);
    hideErrorMessage(errorMessage, config.errorClass);
  });

  toggleDisabledSubmit(inputList, submitButton, config.inactiveButtonClass);
}

enableValidation(formValidationConfig);
