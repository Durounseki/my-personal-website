const validateUsername = (username) => {
  if (username.length > 0) {
    if (username.length > 30) {
      return "Maximum 30 characters";
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      return "Username can only contain letters, numbers, '_', '-', and '.'";
    }
  }
  return null;
};

const validateEmail = (email) => {
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

const validatePassword = (password) => {
  if (password.length < 8 || password.length > 16) {
    return "Password must be between 8 and 16 characters long.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/\W/.test(password)) {
    return "Password must contain at least one special character.";
  }
  if (/\s/.test(password)) {
    return "Password must not contain any spaces.";
  }
  return null;
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Password doesn't match.";
  }
  return null;
};
const validateConfirmEmail = (email, confirmEmail) => {
  if (email !== confirmEmail) {
    return "Email doesn't match.";
  }
  return null;
};

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateConfirmEmail,
};
