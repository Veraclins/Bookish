import { Book } from '../models/index'; // eslint-disable-line 

/**
 * BooksInController is responsible
 * for the logic of performing CRUD operations on the Book resource.
 */
export default class BooksController {
  /**
   * Called when a logged in user sends a request to /api/v1/books/create endpoint
   * with the book properties in the request body
   * This method extracts the extracts these properties and creates a new book in the database
   * and returns it.
   * @param {object} req the request object
   * @param {object} res the response object
   * @return {Object} user res the response object
   */
  static createBook(req, res) {
    const newBook = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      author: req.body.author,
      coverUrl: req.body.coverUrl,
      publicationYear: req.body.publicationYear,
      userId: req.body.userId,
    };
    Book.create(newBook)
      .then(book => res.send({
        status: 'success',
        data: book.toJSON(),
      }))
      .catch(err => res.status(400).send({
        status: 'error',
        message: err.message,
      }));
  }

  static getAllBooks(req, res) {
    Book.findAll({ order: [['id', 'ASC']] })
      .then(books => res.send({
        status: 'success',
        data: books,
      }))
      .catch(err => res.status(400).send({
        status: 'error',
        message: err.message,
      }));
  }

  static updatateBook(req, res) {
    const { bookId } = req.params;
    const newDetails = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      author: req.body.author,
      coverUrl: req.body.coverUrl,
      publicationYear: req.body.publicationYear,
      userId: req.body.userId,
    };
    Book.update(newDetails, { returning: true, where: { id: bookId } })
      .then((value) => {
        const book = value[1][0];
        if (book) {
          res.send({
            status: 'success',
            data: book.toJSON(),
          });
        } else {
          res.status(400).send({
            status: 'error',
            message: 'A book with the given ID does not exist',
          });
        }
      })
      .catch(err => res.status(400).send({
        status: 'error',
        message: err.message,
      }));
  }

  static getOneBook(req, res) {
    const { bookId } = req.params;
    Book.findById(bookId)
      .then((book) => {
        if (book) {
          res.send({
            status: 'success',
            data: book.toJSON(),
          });
        } else {
          res.status(400).send({
            status: 'error',
            message: 'A book with the given ID does not exist',
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 'error',
          message: err.message,
        });
      });
  }

  static deleteBook(req, res) {
    const { bookId } = req.params;
    Book.destroy({ where: { id: bookId } })
      .then((del) => {
        if (del) {
          res.send({
            status: 'success',
            data: `The book with ID ${bookId} was deleted successfully`,
          });
        } else {
          res.status(400).send({
            status: 'error',
            message: 'A book with the given ID does not exist',
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 'error',
          message: err.message,
        });
      });
  }
}
