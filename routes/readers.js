const express = require('express');
const router = express.Router();
const readerCont = require('../controllers/readerController');
const { validateReaders } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', readerCont.getReaders);

router.get('/:id', validateReaders, readerCont.getOneReader);

router.post('/', isAuthenticated, validateReaders, readerCont.createReader);

router.put('/:id',isAuthenticated, validateReaders, readerCont.updateReader);

router.delete('/:id',isAuthenticated, validateReaders, readerCont.deleteReader);

module.exports = router;