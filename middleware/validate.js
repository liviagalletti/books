const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    year: `integer|min:1000|max:${new Date().getFullYear()}`,
    genre: 'string',
    isbn: 'string|min:10|max:13'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateMongoId = (req, res, next) => {
  const idRegex = /^[0-9a-fA-F]{24}$/;
  if (!idRegex.test(req.params.id)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid book ID'
    });
  }
  next();
};

module.exports = {
  saveBook,
  validateMongoId
};