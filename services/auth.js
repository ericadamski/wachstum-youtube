import jwt from "jsonwebtoken";
import Cookies from "cookies";
import DatabaseService from "./database";
import User from "../models/User";

async function createUser(pwd) {
  const request = await fetch("https://paassword.now.sh/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pwd }),
  });

  if (request.ok) {
    const { id } = await request.json();

    return id;
  }
}

async function validatePassword(passwordId, pwd) {
  const request = await fetch(
    `https://paassword.now.sh/api/get/${passwordId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pwd }),
    }
  );

  if (request.ok) {
    const { valid } = await request.json();

    return valid;
  }
}

// Sign our JWT / encrypting
function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET || "secret",
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }

        resolve(token);
      }
    );
  });
}

// Veriy
function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET || "secret", (err, payload) => {
      if (err) {
        return reject(err);
      }

      resolve(payload);
    });
  });
}

async function getUserFromCookie(req) {
  const cookies = new Cookies(req);

  let payload;

  try {
    payload = await verify(cookies.get("_wsp"));
  } catch (error) {
    return null;
  }

  DatabaseService.connect();

  const user = await User.findOne({ _id: payload.id }, { name: -1 });

  return JSON.parse(JSON.stringify(user));
}

export default {
  createUser,
  validatePassword,
  sign,
  verify,
  getUserFromCookie,
};
