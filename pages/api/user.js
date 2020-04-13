import DatabaseService from "../../services/database";
import AuthService from "../../services/auth";
import User from "../../models/user";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { authorization } = req.headers;

  let userId;

  try {
    const { id } = await AuthService.verify(authorization);

    userId = id;
  } catch (error) {
    return res.statud(401).end();
  }

  const user = await User.findOne({ _id: userId }, { name: -1 });

  res.json(user.toObject());
};
