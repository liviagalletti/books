const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getBooks = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const books = await db.collection('books').find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    console.error('Error when searching for books:', err);
    res.status(500).json({ message: 'Error when searching for books', error: err.message });
  }
};



const getOneBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid book ID');
  }

  const bookId = new ObjectId(req.params.id);
  
  try {
    const db = mongodb.getDb();
    const book = await db.collection('books').findOne({ _id: bookId });
    
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error('Error when searching for book:', err);
    res.status(500).json({ message: 'Error when searching for book', error: err.message });
  }
};

const createBook = async (req, res) => {
  console.log('Creating book:', req.body);
  const book = {
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre,
    isbn: req.body.isbn
  };
  try {
    const db = mongodb.getDb();
    const result = await db.collection('books').insertOne(book);
    
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId, message: 'Book created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create book' });
    }
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid id to update a book.' });
  }

  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre,
    isbn: req.body.isbn
  };

  try {
    const db = mongodb.getDb();
    const response = await db.collection('books').replaceOne({ _id: bookId }, book);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: 'No changes were made to the book.' });
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Some error occurred while updating book.', error: error.message });
  }
};


const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid book id to delete a book.' });
  }

  const bookId = new ObjectId(req.params.id);

  try {
    const db = mongodb.getDb();
    const result = await db.collection('books').deleteOne({ _id: bookId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Book successfully deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error occurred while deleting the book', error: error.message });
  }
};

module.exports = {
  getBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook
};