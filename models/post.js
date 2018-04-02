const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

let titleLengthChecker = title => {
  if (!title) {
    return false;
  } else {
    if (title.length < 1 || title.length > 50) {
      return false;
    } else {
      return true;
    }
  }
};

let alphaNumericTitleChecker = title => {
  if (!title) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title);
  }
};

const titleValidators = [
  {
    validator: titleLengthChecker,
    message: 'Title cannot more than 50 characters.'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric.'
  }
];

let bodyLengthChecker = body => {
  if (!body) {
    return false;
  } else {
    if (body.length < 1 || body.length > 500) {
      return false;
    } else {
      return true;
    }
  }
};

const bodyValidators = [
  {
    validator: bodyLengthChecker,
    message: 'Body cannot more than 500 characters.'
  }
];

let commentLengthChecker = comment => {
  if (!comment[0]) {
    return false;
  } else {
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false;
    } else {
      return true;
    }
  }
};

const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments cannot more than 200 characters.'
  }
];

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likedBy: { type: Array },
  dislikedBy: { type: Array },
  comments: [
    {
      comment: { type: String },
      createdBy: { type: String },
      createdAt: { type: Date, default: Date.now() }
    }
  ]
});

postSchema.plugin(autoIncrement.plugin, 'Post')

module.exports = mongoose.model('Post', postSchema);
