const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("current password");
const submitBtn = document.getElementById("submit__btn");

const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.textContent = message;
};

const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const isValidEmail = function (input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

const getFieldName = function (input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  }

  if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  }
};

const passwordMatch = function (password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, `${getFieldName(password1)} does not match`);
  }
};

const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  passwordMatch(password, confirmPassword);
});
