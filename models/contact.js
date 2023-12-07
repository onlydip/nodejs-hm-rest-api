const { Schema, model } = require('mongoose');
const { handleSaveErrors } = require('../utils/');
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please set name for contact'],
      minlegth: 3,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
contactSchema.post('save', handleSaveErrors);
const Contact = model('contact', contactSchema);
module.exports = { Contact };