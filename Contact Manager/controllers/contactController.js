import Contact from '../models/contact.js';
import { validateContact } from '../validators/contactValidator.js';

export const addContact = async (req, res) => {
  const data = req.body;
  if (!validateContact(data)) {
    return res.status(400).json({ error: 'Invalid contact data' });
  }
  const contact = new Contact(data);
  await contact.save();
  res.status(201).json(contact);
};

export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const searchContacts = async (req, res) => {
  const { q } = req.query;
  const result = await Contact.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } }
    ]
  });
  res.json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!validateContact(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const updated = await Contact.findByIdAndUpdate(id, data, { new: true });
  res.json(updated);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.json({ message: 'Contact deleted' });
};

export const filterByGroup = async (req, res) => {
  const { group } = req.params;
  const contacts = await Contact.find({ group });
  res.json(contacts);
};
