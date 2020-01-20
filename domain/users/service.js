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
        const err = {
          message: "User not found",
        };
        throw err;
      }

      return {
        data: existingUser,
      };
    } catch (error) {
      const err = {
        code: "users.findById",
        message: error.message || error,
      };
      throw err;
    }
  };

  const create = async (data) => {
    try {
      const userToBeCreated = { ...data };
      const validation = createUserValidator(userToBeCreated);

      if (validation.error) {
        const err = {
          code: "validation.error",
          message: validation.error,
        };
        throw err;
      }

      const createdUser = await User.create(userToBeCreated);
      return {
        data: createdUser,
      };
    } catch (error) {
      const err = {
        code: error.code || "users.create",
        message: error.message || error,
      };
      throw err;
    }
  };

  const update = async ({ id, data }) => {
    try {
      const userToBeUpdated = { ...data };
      const validation = updateUserValidator(userToBeUpdated);

      if (validation.error) {
        const err = {
          message: validation.error,
        };
        throw err;
      }

      const existingUser = await User.findById(id);
      if (!existingUser) {
        const err = {
          message: "User not found",
        };
        throw err;
      }

      const updatedUser = await User.findByIdAndUpdate(id, userToBeUpdated);
      return {
        data: updatedUser,
      };
    } catch (error) {
      const err = {
        code: "users.update",
        message: error.message || error,
      };
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      const existingUser = await User.findById(id);

      if (!existingUser) {
        const err = {
          message: "User not found",
        };
        throw err;
      }
      const deletedUser = await User.findByIdAndDelete(id);
      return {
        data: deletedUser,
      };
    } catch (error) {
      const err = {
        code: "users.remove",
        message: error.message || error,
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
