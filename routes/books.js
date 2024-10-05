const express = require('express');
const router = express.Router();
const bookCont = require('../controllers/bookController');
const { validateBook } = require('../middleware/validate');

router.get('/', bookCont.getBooks);

router.get('/:id', validateBook, bookCont.getOneBook);

router.post('/', validateBook, bookCont.createBook);

router.put('/:id', validateBook, bookCont.updateBook);

router.delete('/:id', validateBook, bookCont.deleteBook);

module.exports = router;