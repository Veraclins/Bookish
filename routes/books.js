import { Router } from 'express';
import BooksController from '../controllers/BooksController';


const booksRouter = Router();

booksRouter.post('/', BooksController.createBook);
booksRouter.get('/', BooksController.getAllBooks);
booksRouter.get('/:bookId', BooksController.getOneBook);
booksRouter.put('/:bookId', BooksController.updatateBook);
booksRouter.delete('/:bookId', BooksController.deleteBook);


export default booksRouter;
