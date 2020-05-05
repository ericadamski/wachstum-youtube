jest.mock("../../services/database", () => ({
  connect: jest.fn(),
}));
jest.mock("../../services/auth", () => ({
  createUser: jest.fn(),
  sign: jest.fn(),
  validatePassword: jest.fn((pwd) => pwd === "abc123"),
}));

jest.mock("../../models/user", () => {
  const save = jest.fn();
  const User = jest.fn(() => ({ _id: "abc123", save }));

  return Object.assign(User, {
    save,
    findOne: jest.fn(({ email }) => {
      if (email === "abc@abc.com") {
        return Promise.resolve({ _id: "1234", email });
      }

      return Promise.resolve(null);
    }),
  });
});

import authenticate from "../../pages/api/authenticate";
import DatabaseService from "../../services/database";
import AuthService from "../../services/auth";
import User from "../../models/User";

describe("Authenticate route", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: "POST",
      body: { name: "abc", email: "abc@abc.com", password: "abc123" },
    };

    res = {
      status: jest.fn(() => res),
      end: jest.fn(),
    };
  });

  it("Should return 405 if the method is not POST", async () => {
    req.method = "GET";

    const response = await authenticate(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledTimes(1);
  });

  describe("Sign up", () => {
    beforeEach(() => {
      req.body.isSignUp = true;
    });

    it("should return 400 if user already exists", async () => {
      const response = await authenticate(req, res);

      expect(DatabaseService.connect).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.end).toHaveBeenCalledWith(expect.any(String));
    });

    it("should create a user and return a token", async () => {
      req.body.email = "new@user.com";

      const response = await authenticate(req, res);

      expect(DatabaseService.connect).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
      expect(User).toHaveBeenCalledTimes(1);
      expect(AuthService.createUser).toHaveBeenCalledWith(expect.any(String));
      expect(User.save).toHaveBeenCalledTimes(1);
      expect(AuthService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
        })
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });
  });

  describe("Log in", () => {
    it("should return a token if user already exists and passwords match", async () => {
      const response = await authenticate(req, res);

      expect(DatabaseService.connect).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
      expect(AuthService.validatePassword).toHaveBeenCalled();
      expect(AuthService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
        })
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it("should return a 401 if user already exists and passwords don't match", async () => {
      req.body.password = "123abc";

      const response = await authenticate(req, res);

      expect(DatabaseService.connect).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
      expect(AuthService.validatePassword).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it("should return a 400 is no user already exists", async () => {
      req.body.email = "new@user.com";

      const response = await authenticate(req, res);

      expect(DatabaseService.connect).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.end).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
