const express = require('express');
const router = express.Router();
const bookCont = require('../controllers/bookController');
const { validateBook, validateMongoId } = require('../middleware/validate');

router.get('/', bookCont.getBooks);

router.get('/:id', validateMongoId, bookCont.getOneBook);

router.post('/', validateBook, bookCont.createBook);

router.put('/:id', validateMongoId, validateBook, bookCont.updateBook);

router.delete('/:id', validateMongoId, bookCont.deleteBook);

module.exports = router;