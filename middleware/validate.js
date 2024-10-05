const Validator = require('validatorjs');

const validateBook = (req, res, next) => {
  console.log('Validating book:', req.body);
  const validationRule = {
    title: 'string',
    author: 'string',
    year: `integer`,
    genre: 'string',
    isbn: 'string'
  };

  const validation = new Validator(req.body, validationRule);

  if (validation.fails()) {
    console.log('Validation failed:', validation.errors.all());
    return res.status(412).json({
      success: false,
      message: 'Validation failed',
      errors: validation.errors.all()
    });
  }

  console.log('Validation passed');
  next();
};


module.exports = {
  validateBook,
};