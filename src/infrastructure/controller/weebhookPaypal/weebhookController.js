const { verifySignature, updateStatusTransactionsByPaypalId } = require("../../Services/paypal/paypalService");

const paypalWebhook = async (req, res) => {
    try {
        const isValid = await verifySignature(req);
        if (!isValid) {
            return res.status(400).send('Invalid signature');
        }

        const event = req.body;

        if (event.event_type === 'CHECKOUT.ORDER.APPROVED') {
            const paypal_payment_id = event.resource.id;

            const updatedTransaction = await updateStatusTransactionsByPaypalId(paypal_payment_id);

            if (!updatedTransaction) {
                return res.status(404).send('Transaction not found or failed to update');
            }
        }

        res.status(200).send('Webhook received');
    } catch (error) {
        console.error('Error handling PayPal webhook:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { paypalWebhook };
