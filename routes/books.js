const express = require('express');
const router = express.Router();

const bookCont = require('../controllers/bookController');

router.get('/', bookCont.getBooks);

router.get('/:id', validateMongoId, bookCont.getOneBook);

router.post('/', validateMiddleware(bookRules), bookCont.createBook);

router.put('/:id', validateMongoId, validateMiddleware(bookRules), bookCont.updateBook);

router.delete('/:id', validateMongoId, bookCont.deleteBook);


module.exports = router;