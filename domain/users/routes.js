const router = require("express").Router();
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const db = require("../../db");
const createUsersService = require("./service");

const usersService = createUsersService(db);

router.get("/", (req, res) => {
  usersService
    .findAll()
    .then((users) => res.status(OK).json(users))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  usersService
    .findById(id)
    .then((user) => res.status(user.code ? NOT_FOUND : OK).json(user))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).json(err));
});

router.post("/", (req, res) => {
  const { body: data } = req;
  usersService
    .create(data)
    .then((createdUser) =>
      res
        .status(createdUser.code ? INTERNAL_SERVER_ERROR : OK)
        .json(createdUser),
    )
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).json(err));
});

router.put("/:id", (req, res) => {
  const {
    params: { id },
    body: data,
  } = req;
  usersService
    .update({ id, data })
    .then((updatedUser) =>
      res
        .status(updatedUser.code ? INTERNAL_SERVER_ERROR : OK)
        .json(updatedUser),
    )
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  usersService
    .remove(id)
    .then((deletedUser) => res.status(OK).json(deletedUser))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;
