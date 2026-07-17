const form = document.getElementById('registrationForm');

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener('submit', function (event) {
  event.preventDefault();

  clearErrors();

  if (isLocked) {
    document.getElementById('passwordError').innerHTML =
      'Password is locked. Try again after 1 minute.';
    return;
  }

  let firstName = document.getElementById('name');
  let lastName = document.getElementById('lastname');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let category = document.getElementById('category');
  let comments = document.getElementById('comments');

  let gender = document.querySelector('input[name="gender"]:checked');
  let clubs = document.querySelectorAll('input[name="club"]:checked');

  let valid = true;

  if (firstName.value.trim() == '') {
    showError(firstName, 'nameError', 'First name is required.');
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(firstName.value.trim())) {
    showError(firstName, 'nameError', 'Only alphabetic characters are allowed.');
    valid = false;
  } else {
    showSuccess(firstName);
  }

  if (lastName.value.trim() == '') {
    showError(lastName, 'lastnameError', 'Last name is required.');
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(lastName.value.trim())) {
    showError(lastName, 'lastnameError', 'Only alphabetic characters are allowed.');
    valid = false;
  } else {
    showSuccess(lastName);
  }

  if (email.value.trim() == '') {
    showError(email, 'emailError', 'Email is required.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, 'emailError', 'Invalid email address.');
    valid = false;
  } else {
    showSuccess(email);
  }

  if (password.value == '') {
    showError(password, 'passwordError', 'Password is required.');
    valid = false;
  } else if (password.value != 'tanim123') {
    wrongAttempts++;

    showError(
      password,
      'passwordError',
      'Wrong Password! Attempted ' + wrongAttempts + ' of 3.',
    );

    valid = false;

    if (wrongAttempts >= 3) {
      isLocked = true;

      document.getElementById('passwordError').innerHTML =
        'Too many wrong attempts. Password locked for 1 minute.';

      password.disabled = true;

      setTimeout(function () {
        isLocked = false;
        wrongAttempts = 0;
        password.disabled = false;

        document.getElementById('passwordError').innerHTML =
          'Password unlocked. Try again.';
      }, 60000);
    }
  } else {
    wrongAttempts = 0;
    showSuccess(password);
  }

  if (gender == null) {
    document.getElementById('genderError').innerHTML =
      'Please select your gender.';

    valid = false;
  }

  if (clubs.length == 0) {
    document.getElementById('clubError').innerHTML =
      'Select at least one club.';

    valid = false;
  }

  if (category.value == '') {
    showError(category, 'categoryError', 'Please select a category.');

    valid = false;
  } else {
    showSuccess(category);
  }

  if (comments.value.trim() == '') {
    showError(
      comments,
      'commentsError',
      'Please tell us why you want to join.',
    );
    valid = false;
  } else if (comments.value.trim().length < 20) {
    showError(comments, 'commentsError', 'Minimum 20 characters required.');

    valid = false;
  } else {
    showSuccess(comments);
  }

  if (valid) {
    alert('Registration Submitted Successfully!');

    form.reset();

    clearErrors();
  }
});

function showError(input, errorId, message) {
  input.classList.add('errorBorder');
  input.classList.remove('successBorder');

  document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
  input.classList.remove('errorBorder');
  input.classList.add('successBorder');
}

function clearErrors() {
  let errors = document.querySelectorAll('.error');

  errors.forEach(function (item) {
    item.innerHTML = '';
  });

  let fields = document.querySelectorAll('input, select, textarea');

  fields.forEach(function (field) {
    field.classList.remove('errorBorder');
    field.classList.remove('successBorder');
  });
}
