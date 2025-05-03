const express = require('express');
const router = express.Router();
const {
  createCheckoutSession,
  handleStripeWebhook
} = require('../Controller/paymentController');

const authMiddleware = require('../Middleware/authMiddleware');

// Create Stripe checkout session (upgrade to premium)
router.post('/create-checkout-session', authMiddleware.auth, createCheckoutSession);

// Stripe webhook to handle subscription updates
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
