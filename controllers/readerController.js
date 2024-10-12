const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getReaders = async(req, res) =>{
    try {
        const db = await mongodb.getDb();
        const reader = await db.collection('readers').find().toArray();

        res.setHeader('Content-Type','application/json');
        res.status(200).json(reader);
    } catch(err) {
        console.error('Error while searching for readers:',err);
        res.status(500).json({message:'Error while searching for readers:',err:err.message})
    }
}

const getOneReader = async(req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json('Invalid reader id')
    }

    const readerId = new ObjectId(req.params.id)

    try {
        const db = await mongodb.getDb();
        const reader = await db.collection('readers').findOne({_id:readerId})

        if (reader) {
            res.status(200).json(reader);
          } else {
            res.status(404).json({ message: 'Reader not found' });
          }
        } catch (err) {
          console.error('Error while searching for readers:', err);
          res.status(500).json({ message: 'Error while searching for readers', error: err.message });
        }

}

const createReader = async (req, res) =>{
    console.log('Creating reader:', req.body)

    const reader = {
        readerId: req.body.readerId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        favoriteGenres: req.body.favoriteGenres,
        membershipDate: req.body.membershipDate,
        telephone: req.body.telephone
    }
    try {
        const db = mongodb.getDb();
        const result = await db.collection('readers').insertOne(reader);
        
        if (result.acknowledged) {
          res.status(201).json({ id: result.insertedId, message: 'Reader created successfully' });
        } else {
          res.status(500).json({ message: 'Failed to create reader' });
        }
      } catch (err) {
        console.error('Error creating reader:', err);
        res.status(500).json({ message: 'Error creating reader', error: err.message });
      }
}


const updateReader = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid id to update a reader.' });
    }
  
    const readerId = new ObjectId(req.params.id);
    const reader = {
        readerId: req.body.readerId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        favoriteGenres: req.body.favoriteGenres,
        membershipDate: req.body.membershipDate,
        telephone: req.body.telephone
    }
    try {
      const db = mongodb.getDb();
      const response = await db.collection('readers').replaceOne({ _id: readerId }, reader);
  
      if (response.matchedCount === 0) {
        return res.status(404).json({ message: 'Reader not found.' });
      }
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(200).json({ message: 'No changes were made to the readers.' });
      }
    } catch (error) {
      console.error('Error updating reader:', error);
      res.status(500).json({ message: 'Some error occurred while updating reader.', error: error.message });
    }
  };

  const deleteReader = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid id to delete a reader.' });
    }
  
    const readerId = new ObjectId(req.params.id);
  
    try {
      const db = mongodb.getDb();
      const result = await db.collection('readers').deleteOne({ _id: readerId });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Reader successfully deleted' });
      } else {
        res.status(404).json({ message: 'Reader not found' });
      }
    } catch (error) {
      console.error('Error deleting reader:', error);
      res.status(500).json({ message: 'Error occurred while deleting reader', error: error.message });
    }
  };

module.exports = {
    getReaders,
    getOneReader,
    createReader,
    updateReader,
    deleteReader
}