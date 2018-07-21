export default class Validator {
  /**
     *
     */

  static handleErrors(errors, res, next) {
    if (Object.keys(errors).length !== 0) {
      res.status(400).send({ Error: 'Validation error(s)', errors });
    } else {
      next();
    }
  }

  static required(req, res, requiredInput) {
    const errors = {};
    const input = {};

    // Removes empty spaces
    Object.entries(req.body).forEach(([key, value]) => {
      input[key] = value.toString().trim();
    });
    // Checks that all fields are present
    requiredInput.forEach((element) => {
      if (!(element in input)) {
        errors[element] = `${element} is required`;
      }
    });
    if (Object.keys(errors).length !== 0) {
      return Validator.handleErrors(errors, res);
    }
    return input;
  }

  static validateBook(req, res, next) {
    const yearRegex = /[0-9]{4}/;
    const paraRegex = /[A-Za-z0-9\s_.,!"()?@'/$]*/;
    const urlRegex = /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
    const errors = {};
    // Checks that all fields are present
    const field = ['title', 'category', 'description', 'author', 'coverUrl', 'publicationYear'];
    const request = Validator.required(req, res, field);
    if (!request) return;
    const {
      title, category, description, author, coverUrl, publicationYear,
    } = request;

    // Validate each field
    if (!paraRegex.test(title) || title.length < 5) errors.title = 'must be string and at least 5 characters';
    if (!paraRegex.test(category) || category.length < 3) errors.category = 'must be a string and at least 3 characters';
    if (!urlRegex.test(coverUrl)) errors.coverUrl = 'must be a a valid url starting with \'http://\' or \'https://\'';
    if (!paraRegex.test(author) || author.length < 3) errors.author = 'must be a string and at least 3 characters';
    if (!yearRegex.test(publicationYear)) errors.publicationYear = 'must be a valid year e.g 1999';
    if (description.length < 20 || !paraRegex.test(description)) errors.description = 'must be at least 20 characters long';
    Validator.handleErrors(errors, res, next);
  }
}
