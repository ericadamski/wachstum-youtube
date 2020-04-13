import DatabaseService from "../../services/database";
import AuthService from "../../services/auth";
import User from "../../models/User";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  DatabaseService.connect();

  const { name, email, password, isSignUp } = req.body;
  let user = await User.findOne({ email });

  if (isSignUp) {
    if (user) {
      return res
        .status(400)
        .end(`An account already exists for email ${email}.`);
    }

    user = new User({
      name,
      email,
      passwordId: await AuthService.createUser(password),
    });

    await user.save();
  } else {
    if (!user) {
      return res.status(400).end(`No account exists for email ${email}`);
    }

    if (!(await AuthService.validatePassword(user.passwordId, password))) {
      return res.status(401).end();
    }
  }

  res.end(
    await AuthService.sign({
      id: user._id,
    })
  );
};
