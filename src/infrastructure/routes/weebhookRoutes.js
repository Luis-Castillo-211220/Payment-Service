const express = require('express');
const { paypalWebhook } = require('../../infrastructure/controller/weebhookPaypal/weebhookController');

const router = express.Router();

router.post('/webhook/paypal', express.json(), paypalWebhook);

module.exports = router;
