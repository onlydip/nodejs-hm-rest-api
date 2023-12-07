const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErrors } = require('../utils');

const emailRegexp = /^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/;
const subscriptions = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlegth: 6,
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptions),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};