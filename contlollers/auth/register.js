const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = uniqid();
  const avatarUrl = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердіть email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        avatarUrl,
        verificationToken,
      },
    },
  });
};

module.exports = register;
