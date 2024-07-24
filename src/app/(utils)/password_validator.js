export const InitialValue = () => {
  return {
    has_digit: false,
    has_upper_case: false,
    has_special_char: false,
    has_length: false,
  };
};

export const Validate = (password) => {
  const digit_regex = /^(?=.*\d)/;
  const upper_case_regex = /^(?=.*[A-Z])/;
  const special_char_regex = /^(?=.*[!@#$%^&*()])/;

  return {
    has_digit: digit_regex.test(password),
    has_upper_case: upper_case_regex.test(password),
    has_special_char: special_char_regex.test(password),
    has_length: password.length >= 8 && password.length <= 16,
  };
};
