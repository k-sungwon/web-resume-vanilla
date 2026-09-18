(() => {
  'use strict';

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const form = document.querySelector('#contact-form');

  if (!form) {
    return;
  }

  const formStatus = form.querySelector('.form-status');
  const fieldNames = ['name', 'email', 'message'];
  const state = {
    values: { name: '', email: '', message: '' },
    errors: { name: '', email: '', message: '' },
    isSubmitted: false,
  };

  const getValues = () => Object.fromEntries(
    fieldNames.map((name) => [name, form.elements[name].value.trim()]),
  );

  const validateField = (name, value) => {
    if (!value) {
      const requiredMessages = {
        name: '이름을 입력해 주세요.',
        email: '이메일을 입력해 주세요.',
        message: '메시지를 입력해 주세요.',
      };

      return requiredMessages[name];
    }

    if (name === 'email' && !EMAIL_PATTERN.test(value)) {
      return '올바른 이메일 형식을 입력해 주세요.';
    }

    return '';
  };

  const validate = (values) => Object.fromEntries(
    fieldNames.map((name) => [name, validateField(name, values[name])]),
  );

  const renderFieldError = (name, error) => {
    const field = form.elements[name];
    const errorElement = document.querySelector(`#${name}-error`);

    if (!field || !errorElement) {
      return;
    }

    field.classList.toggle('invalid', Boolean(error));
    field.setAttribute('aria-invalid', String(Boolean(error)));
    errorElement.textContent = error;
  };

  const renderErrors = (errors) => {
    fieldNames.forEach((name) => renderFieldError(name, errors[name]));
  };

  const hasErrors = (errors) => Object.values(errors).some(Boolean);

  form.addEventListener('input', (event) => {
    const { name } = event.target;

    if (!fieldNames.includes(name)) {
      return;
    }

    state.values[name] = event.target.value.trim();
    state.errors[name] = validateField(name, state.values[name]);
    state.isSubmitted = false;
    formStatus.textContent = '';
    renderFieldError(name, state.errors[name]);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    state.values = getValues();
    state.errors = validate(state.values);
    state.isSubmitted = true;
    renderErrors(state.errors);

    if (hasErrors(state.errors)) {
      formStatus.textContent = '';
      form.elements[fieldNames.find((name) => state.errors[name])].focus();
      return;
    }

    formStatus.textContent = '메시지가 성공적으로 확인되었습니다.';
    form.reset();
    state.values = { name: '', email: '', message: '' };
    state.errors = { name: '', email: '', message: '' };
    renderErrors(state.errors);
  });
})();
