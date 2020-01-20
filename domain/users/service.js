const { createUserValidator, updateUserValidator } = require("./validators");

module.exports = ({ User }) => {
  const findAll = async () => {
    try {
      const users = await User.find({});
      return {
        data: users,
      };
    } catch (error) {
      const err = {
        code: "users.findAll",
        message: error,
      };
      throw err;
    }
  };

  const findById = async (id) => {
    try {
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return {
          code: "users.findById",
          message: "User not found",
        };
      }

      return {
        data: existingUser,
      };
    } catch (error) {
      const err = {
        code: "users.findById",
        message: error,
      };
      throw err;
    }
  };

  const create = async (data) => {
    try {
      const userToBeCreated = { ...data };
      const validation = createUserValidator(userToBeCreated);

      if (validation.error) {
        return {
          code: "users.create",
          message: validation.error,
        };
      }

      const createdUser = await User.create(userToBeCreated);
      return {
        data: createdUser,
      };
    } catch (error) {
      const err = {
        code: "users.create",
        message: error,
      };
      throw err;
    }
  };

  const update = async ({ id, data }) => {
    try {
      const userToBeUpdated = { ...data };
      const validation = updateUserValidator(userToBeUpdated);

      if (validation.error) {
        return {
          code: "users.update",
          message: validation.error,
        };
      }

      const updatedUser = await User.findByIdAndUpdate(id, userToBeUpdated);
      return {
        data: updatedUser,
      };
    } catch (error) {
      const err = {
        code: "users.update",
        message: error,
      };
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      const deletedUser = await User.findByIdAndRemove(id);
      return {
        data: deletedUser,
      };
    } catch (error) {
      const err = {
        code: "users.remove",
        message: error,
      };
      throw err;
    }
  };

  return {
    findAll,
    findById,
    create,
    update,
    remove,
  };
};
