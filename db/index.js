const mongoose = require("mongoose");

const User = require("../domain/users/model");

const start = () =>
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const close = () => mongoose.connection.close();

module.exports = {
  start,
  close,
  User,
};
