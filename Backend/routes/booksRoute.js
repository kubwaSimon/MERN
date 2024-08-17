import express, { application } from 'express';
import {Book} from '../models/bookmodels.js';
const router = express.Router();


// Route for saving a new book
router.post('/', async (request, response) => {
    try {
      // Check if required fields are provided
      if (
        !request.body.title || 
        !request.body.author || 
        !request.body.publishYear) {
        return response.status(400).send({
          message: 'Send All Required fields: title, author, publishYear',
        });
      }
  
      // Create a new book object
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      // Save the new book to the database
      const book = await Book.create(newBook);
  
      // Return the saved book
      return response.status(201).send(book); // Status 201 for created resource
    } catch (error) {
      console.error(error.message); // Use console.error for logging errors
      response.status(500).send({ message: error.message });
    }
  });
  
 

  //Route for getting all books from DB
router.get('/',async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count:books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

  //Route for get one book from DB
  router.get('/:id', async (request, response) => {
    try{
      const {id} =request.params;
      const book = await Book.findById(id);

      return response.status(200).json(book);
    }catch (error){
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  });

//Route for update a book
router.put('/:id',async (request, response) => {
  try {
    if(!request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title,author, publishYear',
      });
    }
    const {id} = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({message: 'Book Not found'});
    }
    return response.status(200).send({message:'Book updated succesfully'});
  } catch (error) {
    console.log (error.message);
    response.status(500).send({message: error.message});
  }
});

//Route for delete a book
router.delete('/:id', async(request, response)=> {
  try {
    const {id} = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({message: 'Book Not Found'});
      
    }
    return response.status(200).send({message: 'Deleted successfully'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message:'error.message'});
  }
});
  export default router;
  