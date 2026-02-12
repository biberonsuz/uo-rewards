const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { getAddresses, createAddress, updateAddress, deleteAddress, formatAddress } = require('../services/addressService');

router.use(requireAuth);

// GET /api/addresses
router.get('/', (req, res) => {
  const addresses = getAddresses(req.user.userId);
  res.json(addresses.map(formatAddress));
});

// POST /api/addresses
router.post('/', (req, res) => {
  const { label, fullName, addressLine1, addressLine2, city, postcode, country, isDefault } = req.body;

  if (!addressLine1 || !city || !postcode) {
    return res.status(400).json({ error: 'Address line 1, city, and postcode are required' });
  }

  const address = createAddress(req.user.userId, {
    label, fullName, addressLine1, addressLine2, city, postcode, country, isDefault
  });
  res.status(201).json(formatAddress(address));
});

// PUT /api/addresses/:id
router.put('/:id', (req, res) => {
  const { label, fullName, addressLine1, addressLine2, city, postcode, country } = req.body;
  const address = updateAddress(parseInt(req.params.id), req.user.userId, {
    label, fullName, addressLine1, addressLine2, city, postcode, country
  });

  if (!address) return res.status(404).json({ error: 'Address not found' });
  res.json(formatAddress(address));
});

// DELETE /api/addresses/:id
router.delete('/:id', (req, res) => {
  const deleted = deleteAddress(parseInt(req.params.id), req.user.userId);
  if (!deleted) return res.status(404).json({ error: 'Address not found' });
  res.json({ message: 'Address deleted' });
});

module.exports = router;
