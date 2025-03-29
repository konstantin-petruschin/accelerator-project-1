const initFormValidation = () => {
  const form = document.querySelector('.registration__form');

  if (!form) {
    return;
  }

  const inputs = form.querySelectorAll('input[required]');

  const validateInput = (input) => {
    if (input.name === 'name') {
      return /^[A-Za-zА-Яа-яЁё\s]+$/.test(input.value);
    }
    if (input.name === 'phone') {
      return /^[0-9+\(\)\s-]+$/.test(input.value);
    }
    return true;
  };

  inputs.forEach((input) => {
    // Добавляем класс для стилизации при любой ошибке валидации
    input.addEventListener('invalid', () => {
      form.classList.add('registration__form--submitted');
    });

    input.addEventListener('input', () => {
      if (form.classList.contains('registration__form--submitted')) {
        if (!validateInput(input) && input.value) {
          if (input.name === 'name') {
            input.setCustomValidity('Имя может содержать только буквы и пробелы');
          }
          if (input.name === 'phone') {
            input.setCustomValidity('Телефон может содержать только цифры и символы + - ( )');
          }
        } else {
          input.setCustomValidity('');
        }
      }
    });
  });

  form.addEventListener('submit', (evt) => {
    form.classList.add('registration__form--submitted');

    inputs.forEach((input) => {
      if (!validateInput(input) && input.value) {
        evt.preventDefault();
        if (input.name === 'name') {
          input.setCustomValidity('Имя может содержать только буквы и пробелы');
        }
        if (input.name === 'phone') {
          input.setCustomValidity('Телефон может содержать только цифры и символы + - ( )');
        }
      } else {
        input.setCustomValidity('');
      }
    });
  });
};

export {initFormValidation};
