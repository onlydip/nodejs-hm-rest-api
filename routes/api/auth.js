const express = require("express");
const { validateBody, authenticate, isValidId } = require("../../middlewares");
const {
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("../../schemas/users");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post("/register", validateBody(registerJoiSchema), ctrl.register);

router.post("/login", validateBody(loginJoiSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/:contactId/subscription",
  isValidId,
  authenticate,
  validateBody(subscriptionJoiSchema),
  ctrl.subscription
);

module.exports = router;