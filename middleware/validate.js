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

const validateReaders = (req,res,next) => {
  console.log('Validating readers:', req.body);
  const validationRule = {
    readerId:'integer',
    name:'string',
    email:'string',
    age:'integer',
    favoriteGenres:'array',
    membershipDate:'string',
    telephone:'string'
}

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
  validateReaders
};