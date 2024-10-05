const Validator = require('validatorjs');

const validate = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.passes()) {
    return null;
  }
  return validation.errors.all();
};

module.exports = validate;