import express from 'express';
import {
  addContact,
  getAllContacts,
  searchContacts,
  updateContact,
  deleteContact,
  filterByGroup
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', addContact);
router.get('/', getAllContacts);
router.get('/search', searchContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.get('/group/:group', filterByGroup);

export default router;
