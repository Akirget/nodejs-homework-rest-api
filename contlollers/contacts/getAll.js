// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const contact = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = getAll;
