const { expect } = require("chai");
const { Types } = require("mongoose");

const db = require("../db");

const createUsersService = require("../domain/users/service");

const usersService = createUsersService(db);

let fakeUser;

describe("Users tests", () => {
  before(async () => {
    await db.start();
  });
  beforeEach(async () => {
    fakeUser = {
      name: "Test",
      flightId: "AD24QC3254A",
      bags: 2,
    };
    await db.User.deleteMany({});
  });
  after(async () => {
    await db.User.deleteMany({});
    await db.close();
  });

  it("Find all users", async () => {
    const users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(0);
  });
  it("Find one user by id", async () => {
    let users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(0);
    const createdUser = await usersService.create(fakeUser);
    users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(1);

    const user = await usersService.findById(createdUser.data.id);
    expect(user.data.name).to.be.equal(fakeUser.name);
  });
  it("Find one user by id but fails becuase it doesn't exists", async () => {
    try {
      const users = await usersService.findAll();
      expect(users.data).to.be.lengthOf(0);
      await usersService.findById(Types.ObjectId());
    } catch (error) {
      expect(error.message).to.be.equal("User not found");
    }
  });
  it("Creates one user", async () => {
    let users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(0);
    await usersService.create(fakeUser);
    users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(1);
  });
  it("Creates one user but fails because no name provided", async () => {
    try {
      const users = await usersService.findAll();
      expect(users.data).to.be.lengthOf(0);
      fakeUser.name = null;
      await usersService.create(fakeUser);
    } catch (error) {
      expect(error.code).to.be.equal("validation.error");
    }
  });
  it("Updates one user", async () => {
    let users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(0);
    const createdUser = await usersService.create(fakeUser);
    users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(1);
    fakeUser.name = "Updated Test";
    await usersService.update({
      id: createdUser.data.id,
      data: fakeUser,
    });
    const user = await usersService.findById(createdUser.data.id);
    expect(user.data.name).to.be.equal(fakeUser.name);
  });
  it("Updates one user but fails because it doesn't exists", async () => {
    try {
      let users = await usersService.findAll();
      expect(users.data).to.be.lengthOf(0);
      await usersService.create(fakeUser);
      users = await usersService.findAll();
      expect(users.data).to.be.lengthOf(1);
      fakeUser.name = "Updated Test";
      await usersService.update({
        id: Types.ObjectId(),
        data: fakeUser,
      });
    } catch (error) {
      expect(error.message).to.be.equal("User not found");
    }
  });
  it("Deletes one user", async () => {
    let users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(0);
    const createdUser = await usersService.create(fakeUser);
    users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(1);
    await usersService.remove(createdUser.data.id);
    users = await usersService.findAll();
    expect(users.data).to.be.lengthOf(0);
  });
  it("Deletes one user but fails because it doesn't exists", async () => {
    try {
      let users = await usersService.findAll();
      expect(users.data).to.be.lengthOf(0);
      await usersService.create(fakeUser);
      users = await usersService.findAll();
      expect(users.data).to.be.lengthOf(1);
      await usersService.remove(Types.ObjectId());
    } catch (error) {
      expect(error.message).to.be.equal("User not found");
    }
  });
});
