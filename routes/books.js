const express = require('express');
const router = express.Router();
const bookCont = require('../controllers/bookController');
const { validateBook } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', bookCont.getBooks);

router.get('/:id', validateBook, bookCont.getOneBook);

router.post('/', isAuthenticated, validateBook, bookCont.createBook);

router.put('/:id', isAuthenticated, validateBook, bookCont.updateBook);

router.delete('/:id', isAuthenticated, validateBook, bookCont.deleteBook);

module.exports = router;