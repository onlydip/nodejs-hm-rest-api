const Contact = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  if (favorite) {
    query.where("favorite").equals(favorite);
  }
  const result = await query.exec();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).exec();
  if (result.owner.toString() !== req.user._id.toString()) {;
    throw HttpError(404, "Not found!");
  }

  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (result.owner.toString() !== req.user._id.toString()) {
    throw HttpError(404, "Not found!");
  }

  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json({ message: "Contact deleted!" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result.owner.toString() !== req.user._id.toString()) {
    throw HttpError(404, "Not found!");
  }

  if (!result) {
    throw HttpError(404, "Not found!");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};