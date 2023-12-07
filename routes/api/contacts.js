const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../utils');
const { validateBody, authenticate } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getContactById));

router.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.patchSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.removeContact));

module.exports = router;